import { Request, Response, NextFunction } from 'express';
import { body, validationResult, param, ValidationError } from 'express-validator';
import mongoose from 'mongoose';

// Validation middleware for creating/updating cakes
export const validateCake = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),

  body('comment')
    .trim()
    .notEmpty().withMessage('Comment is required')
    .isLength({ min: 5 }).withMessage('Comment must be at least 5 characters long')
    .isLength({ max: 200 }).withMessage('Comment must not exceed 200 characters'),

  body('imageUrl')
    .trim()
    .notEmpty().withMessage('Image URL is required')
    .isURL().withMessage('Image URL must be a valid URL'),

  body('yumFactor')
    .notEmpty().withMessage('Yum factor is required')
    .isInt({ min: 1, max: 5 }).withMessage('Yum factor must be an integer between 1 and 5'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err: ValidationError) => ({
          field: (err as any).param || 'unknown', // Ensure safe type assertion
          message: err.msg,
        })),
      });
    }
    next();
  }
];

// Validate MongoDB ObjectId
export const validateObjectId = [
  param('id')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid cake ID format');
      }
      return true;
    }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err: ValidationError) => ({
          field: (err as any).param || 'unknown', // Ensure safe type assertion
          message: err.msg,
        })),
      });
    }
    next();
  }
];
