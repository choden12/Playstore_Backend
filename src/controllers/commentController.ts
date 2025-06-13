import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/prisma.util";
import Joi from "joi";
import { formatError } from "../utils/error.util";

/**
 * Joi schema for comment validation.
 */
const commentSchema = Joi.object({
  reviewId: Joi.number().integer().optional(),
  text: Joi.string().min(1).required(),
  rating: Joi.number().min(1).max(5).required(),
  gameId: Joi.number().integer().required(),
});

/**
 * Create a new comment for a review or game.
 * @route POST /api/v1/comments
 * @access Protected (JWT)
 */
export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = commentSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(formatError(400, "Validation error", error.details.map((d) => d.message)));
    }
    // @ts-ignore
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json(formatError(401, "Unauthorized", ["User not authenticated"]));
    }
    const { reviewId, text, rating, gameId } = req.body;
    const comment = await prisma.comment.create({
      data: {
        reviewId,
        text,
        userId,
        rating,
        gameId,
      },
    });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

/**
 * Get all comments, with optional filtering by gameId or userId.
 * @route GET /api/v1/comments
 */
export const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter: any = {};
    if (req.query.gameId) filter.gameId = Number(req.query.gameId);
    if (req.query.userId) filter.userId = Number(req.query.userId);
    const comments = await prisma.comment.findMany({
      where: filter,
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ comments });
  } catch (err) {
    next(err);
  }
};

/**
 * Get a single comment by ID.
 * @route GET /api/v1/comments/:id
 */
export const getCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json(formatError(400, "Invalid ID", ["Comment ID must be a number"]));
    }
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!comment) {
      return res
        .status(404)
        .json(formatError(404, "Not found", ["Comment not found"]));
    }
    res.json(comment);
  } catch (err) {
    next(err);
  }
};

/**
 * Update a comment.
 * @route PUT /api/v1/comments/:id
 * @access Protected (JWT)
 */
export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const { error } = commentSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(formatError(400, "Validation error", error.details.map((d) => d.message)));
    }
    // @ts-ignore
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json(formatError(401, "Unauthorized", ["User not authenticated"]));
    }
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment || comment.userId !== userId) {
      return res
        .status(403)
        .json(formatError(403, "Forbidden", ["Not allowed to update this comment"]));
    }
    const { reviewId, text, rating, gameId } = req.body;
    const updated = await prisma.comment.update({
      where: { id },
      data: { reviewId, text, rating, gameId },
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a comment.
 * @route DELETE /api/v1/comments/:id
 * @access Protected (JWT)
 */
export const deleteComment = async (
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
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment || comment.userId !== userId) {
      return res
        .status(403)
        .json(formatError(403, "Forbidden", ["Not allowed to delete this comment"]));
    }
    await prisma.comment.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

/**
 * Get comments for a specific game.
 * @route GET /api/v1/comments/game/:gameId
 */
export const getCommentsForGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gameId = Number(req.params.gameId);
    const comments = await prisma.comment.findMany({
      where: { gameId },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    res.json({ comments });
  } catch (err) {
    next(err);
  }
};
