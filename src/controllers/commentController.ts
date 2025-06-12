import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

/**
 * Create a new comment for a review.
 */
export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Only accept fields that exist in the Comment model
    const { reviewId, text, userId } = req.body;
    if (!reviewId || !text || !userId) {
      return res
        .status(400)
        .json({ error: "reviewId, text, and userId are required." });
    }
    const comment = await prisma.comment.create({
      data: {
        reviewId: Number(reviewId),
        text,
        userId: Number(userId),
      },
    });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

/**
 * Get comments for a specific game.
 */
export const getCommentsForGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gameId = Number(req.params.gameId);
    // Find all reviews for the game, then all comments for those reviews
    const reviews = await prisma.review.findMany({
      where: { gameId },
      select: { id: true },
    });
    const reviewIds = reviews.map((r) => r.id);
    const comments = await prisma.comment.findMany({
      where: { reviewId: { in: reviewIds } },
      include: { user: true },
    });
    res.json({ comments });
  } catch (err) {
    next(err);
  }
};
