import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const gameSchema = Joi.object({
  image: Joi.string().min(1).required(),
  name: Joi.string().min(2).max(100).required(),
  tags: Joi.string().min(1).required(),
  rating: Joi.number().min(0).max(5).required(),
  category: Joi.string().min(2).max(100).required(),
});

export const validateGame = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = gameSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      error: {
        code: 400,
        message: "Validation error",
        details: error.details.map((d) => d.message),
      },
    });
    return;
  }
  next();
};
