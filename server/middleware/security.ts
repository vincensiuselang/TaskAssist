import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

// Password hashing utility
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Password verification utility
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// SQL injection prevention middleware
export const preventSQLInjection = (req: Request, res: Response, next: NextFunction) => {
  const sqlKeywords = [
    'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE', 'ALTER',
    'EXEC', 'EXECUTE', 'UNION', 'SCRIPT', 'DECLARE', '--', ';', 'xp_'
  ];
  
  const checkValue = (value: any): boolean => {
    if (typeof value === 'string') {
      return sqlKeywords.some(keyword => 
        value.toUpperCase().includes(keyword.toUpperCase())
      );
    }
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(checkValue);
    }
    return false;
  };
  
  // Check request body, query, and params
  const suspicious = [req.body, req.query, req.params].some(checkValue);
  
  if (suspicious) {
    return res.status(400).json({
      error: 'Invalid input detected',
      message: 'Request contains potentially malicious content'
    });
  }
  
  next();
};

// XSS protection middleware
export const preventXSS = (req: Request, res: Response, next: NextFunction) => {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
    /<link/gi,
    /<meta/gi,
  ];
  
  const checkForXSS = (obj: any): boolean => {
    if (typeof obj === 'string') {
      return xssPatterns.some(pattern => pattern.test(obj));
    }
    if (typeof obj === 'object' && obj !== null) {
      return Object.values(obj).some(checkForXSS);
    }
    return false;
  };
  
  if (checkForXSS(req.body) || checkForXSS(req.query)) {
    return res.status(400).json({
      error: 'Invalid input detected',
      message: 'Request contains potentially malicious scripts'
    });
  }
  
  next();
};

// Request size limiter
export const limitRequestSize = (req: Request, res: Response, next: NextFunction) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  let size = 0;
  
  req.on('data', (chunk) => {
    size += chunk.length;
    if (size > maxSize) {
      res.status(413).json({
        error: 'Request too large',
        message: 'Request size exceeds maximum allowed size'
      });
      return;
    }
  });
  
  next();
};

// Security headers middleware
export const setSecurityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Remove server information
  res.removeHeader('X-Powered-By');
  
  // Set security headers
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('Expect-CT', 'max-age=86400, enforce');
  
  next();
};