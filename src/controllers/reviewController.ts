import { Request, Response, NextFunction } from "express";

/**
 * Create a new review for a game.
 */
export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // ...business logic to create review...
    res.status(201).json({ message: "Review created" });
  } catch (err) {
    next(err);
  }
};

/**
 * List all reviews for a game.
 */
export const listReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // ...business logic to list reviews...
    res.status(200).json({ reviews: [] });
  } catch (err) {
    next(err);
  }
};
