import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { securityConfig } from "./config/security";
import { preventSQLInjection, preventXSS, setSecurityHeaders } from "./middleware/security";

const app = express();

// Trust proxy for accurate IP detection - needed for Replit
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: securityConfig.csp.directives,
  },
  crossOriginEmbedderPolicy: false,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: securityConfig.rateLimiting.windowMs,
  max: securityConfig.rateLimiting.general.max,
  message: {
    error: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const strictLimiter = rateLimit({
  windowMs: securityConfig.rateLimiting.windowMs,
  max: securityConfig.rateLimiting.strict.max,
  message: {
    error: "Too many requests, please try again later."
  }
});

export const apiLimiter = rateLimit({
  windowMs: securityConfig.rateLimiting.windowMs,
  max: securityConfig.rateLimiting.api.max,
  message: {
    error: "API rate limit exceeded, please try again later."
  }
});

app.use(limiter);

// CORS configuration
app.use(cors(securityConfig.cors));

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Data sanitization against NoSQL injection attacks
app.use(mongoSanitize());

// Custom security middleware
app.use(setSecurityHeaders);
app.use(preventSQLInjection);
app.use(preventXSS);

// Body parsing with size limits
app.use(express.json({ limit: securityConfig.validation.maxBodySize }));
app.use(express.urlencoded({ extended: false, limit: securityConfig.validation.maxBodySize }));

// Security headers
app.use((req, res, next) => {
  Object.entries(securityConfig.headers).forEach(([header, value]) => {
    if (value) {
      res.setHeader(header, value);
    }
  });
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
