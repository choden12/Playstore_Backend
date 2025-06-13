import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Joi schema to validate category data
const categorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
});

export function validateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: {
        code: 400,
        message: "Validation error",
        details: error.details.map((d) => d.message),
      },
    });
  }
  next();
}

export function validateCategoryId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      error: {
        code: 400,
        message: "Invalid category ID",
        details: ["Category ID must be a positive integer"],
      },
    });
  }
  next();
}
