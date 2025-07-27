import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { apiLimiter, strictLimiter } from "./index";

export async function registerRoutes(app: Express): Promise<Server> {
  // Apply API rate limiting to all /api routes
  app.use('/api', apiLimiter);

  // Security health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      security: {
        https: req.secure,
        userAgent: req.get('User-Agent')?.substring(0, 50),
        ip: req.ip,
      }
    });
  });

  // Security headers test endpoint (for development)
  if (process.env.NODE_ENV === 'development') {
    app.get('/api/security-test', (req, res) => {
      res.json({
        headers: {
          'Content-Security-Policy': res.getHeader('Content-Security-Policy'),
          'X-Frame-Options': res.getHeader('X-Frame-Options'),
          'X-Content-Type-Options': res.getHeader('X-Content-Type-Options'),
          'Strict-Transport-Security': res.getHeader('Strict-Transport-Security'),
        },
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      });
    });
  }

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
