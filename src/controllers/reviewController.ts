import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

/**
 * Create a new review for a game.
 */
export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { gameId, rating, text, userId } = req.body;
    const parsedUserId = Number(userId);
    if (!userId || isNaN(parsedUserId)) {
      return res
        .status(400)
        .json({ error: "Valid userId is required in the request body." });
    }
    if (!gameId || !rating || !text) {
      return res
        .status(400)
        .json({ error: "gameId, rating, and text are required." });
    }
    const review = await prisma.review.create({
      data: {
        gameId: Number(gameId),
        rating: Number(rating),
        text,
        userId: parsedUserId,
      },
      include: {
        user: true,
      },
    });
    res.status(201).json(review);
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
    const gameId = Number(req.params.gameId);
    const reviews = await prisma.review.findMany({
      where: { gameId },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ reviews });
  } catch (err) {
    next(err);
  }
};

/**
 * Get review statistics for a game.
 */
export const getReviewStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gameId = Number(req.params.gameId);

    // Get average rating and total count
    const [avg, count, stars] = await Promise.all([
      prisma.review.aggregate({
        where: { gameId },
        _avg: { rating: true },
      }),
      prisma.review.count({ where: { gameId } }),
      Promise.all(
        [5, 4, 3, 2, 1].map((star) =>
          prisma.review.count({ where: { gameId, rating: star } })
        )
      ),
    ]);

    res.json({
      average: avg._avg.rating ?? 0,
      total: count,
      stars: {
        5: stars[0],
        4: stars[1],
        3: stars[2],
        2: stars[3],
        1: stars[4],
      },
    });
  } catch (err) {
    next(err);
  }
};
