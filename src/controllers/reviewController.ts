import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/prisma.util";
import Joi from "joi";
import { formatError } from "../utils/error.util";

/**
 * Joi schema for review validation.
 */
const reviewSchema = Joi.object({
  gameId: Joi.number().integer().required(),
  rating: Joi.number().min(1).max(5).required(),
  text: Joi.string().min(1).required(),
});

/**
 * Create a new review for a game.
 * @route POST /api/v1/reviews
 * @access Protected (JWT)
 */
export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(
          formatError(
            400,
            "Validation error",
            error.details.map((d) => d.message)
          )
        );
    }
    // @ts-ignore
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json(formatError(401, "Unauthorized", ["User not authenticated"]));
    }
    const { gameId, rating, text } = req.body;
    const review = await prisma.review.create({
      data: {
        gameId,
        rating,
        text,
        userId,
      },
      include: { user: true },
    });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

/**
 * Get all reviews, with optional filtering by gameId or userId.
 * @route GET /api/v1/reviews
 */
export const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter: any = {};
    if (req.query.gameId) filter.gameId = Number(req.query.gameId);
    if (req.query.userId) filter.userId = Number(req.query.userId);
    const reviews = await prisma.review.findMany({
      where: filter,
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ reviews });
  } catch (err) {
    next(err);
  }
};

/**
 * Get a single review by ID.
 * @route GET /api/v1/reviews/:id
 */
export const getReviewById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json(formatError(400, "Invalid ID", ["Review ID must be a number"]));
    }
    const review = await prisma.review.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!review) {
      return res
        .status(404)
        .json(formatError(404, "Not found", ["Review not found"]));
    }
    res.json(review);
  } catch (err) {
    next(err);
  }
};

/**
 * Update a review.
 * @route PUT /api/v1/reviews/:id
 * @access Protected (JWT)
 */
export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    // Validate request body
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(
          formatError(
            400,
            "Validation error",
            error.details.map((d) => d.message)
          )
        );
    }
    // @ts-ignore
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json(formatError(401, "Unauthorized", ["User not authenticated"]));
    }
    // Only allow update if review belongs to user
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review || review.userId !== userId) {
      return res
        .status(403)
        .json(
          formatError(403, "Forbidden", ["Not allowed to update this review"])
        );
    }
    const { gameId, rating, text } = req.body;
    const updated = await prisma.review.update({
      where: { id },
      data: { gameId, rating, text },
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a review.
 * @route DELETE /api/v1/reviews/:id
 * @access Protected (JWT)
 */
export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    // @ts-ignore
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json(formatError(401, "Unauthorized", ["User not authenticated"]));
    }
    // Only allow delete if review belongs to user
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review || review.userId !== userId) {
      return res
        .status(403)
        .json(
          formatError(403, "Forbidden", ["Not allowed to delete this review"])
        );
    }
    await prisma.review.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

/**
 * List all reviews for a game.
 * @route GET /api/v1/reviews/game/:gameId
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
 * @route GET /api/v1/reviews/stats/:gameId
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
