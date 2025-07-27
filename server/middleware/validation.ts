import { body, validationResult, param, query } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation error handler
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Common validation rules
export const commonValidation = {
  // Sanitize and validate text inputs
  sanitizeText: body('*').trim().escape(),
  
  // Username validation
  username: body('username')
    .isLength({ min: 3, max: 50 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must be 3-50 characters and contain only letters, numbers, and underscores'),
    
  // Password validation
  password: body('password')
    .isLength({ min: 8, max: 128 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must be 8-128 characters and contain at least one lowercase, uppercase, number and special character'),
    
  // Email validation
  email: body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
    
  // UUID validation
  id: param('id')
    .isUUID()
    .withMessage('Invalid ID format'),
    
  // Pagination validation
  page: query('page')
    .optional()
    .isInt({ min: 1, max: 1000 })
    .toInt(),
    
  limit: query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .toInt(),
};

// Rate limiting for sensitive operations
export const sensitiveOperationLimiter = (req: Request, res: Response, next: NextFunction) => {
  // Additional rate limiting for sensitive operations like login, register, password reset
  next();
};