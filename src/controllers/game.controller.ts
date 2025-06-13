import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/prisma.util";
import Joi from "joi";
import { formatError } from "../utils/error.util";

/**
 * Joi schema for game validation.
 */
const gameSchema = Joi.object({
  image: Joi.string().min(1).required(),
  name: Joi.string().min(2).max(100).required(),
  tags: Joi.string().min(1).required(),
  rating: Joi.number().min(0).max(5).required(),
  category: Joi.string().min(2).max(100).required(),
});

/**
 * Get all games.
 */
export const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const games = await prisma.game.findMany();
    res.json(games);
  } catch (err) {
    next(err);
  }
};

/**
 * Get a game by ID.
 */
export const getGameById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json(formatError(400, "Invalid ID", ["Game ID must be a number"]));
    }
    const game = await prisma.game.findUnique({ where: { id } });
    if (!game) {
      return res
        .status(404)
        .json(formatError(404, "Not found", ["Game not found"]));
    }
    res.json(game);
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new game.
 * @route POST /api/v1/games
 * @access Protected (JWT)
 */
export const createGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = gameSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(formatError(400, "Validation error", error.details.map((d) => d.message)));
    }
    const { image, name, tags, rating, category } = req.body;
    const game = await prisma.game.create({
      data: { image, name, tags, rating, category },
    });
    res.status(201).json(game);
  } catch (err) {
    next(err);
  }
};

/**
 * Update a game.
 * @route PUT /api/v1/games/:id
 * @access Protected (JWT)
 */
export const updateGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const { error } = gameSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(formatError(400, "Validation error", error.details.map((d) => d.message)));
    }
    const { image, name, tags, rating, category } = req.body;
    const game = await prisma.game.update({
      where: { id },
      data: { image, name, tags, rating, category },
    });
    res.json(game);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a game.
 * @route DELETE /api/v1/games/:id
 * @access Protected (JWT)
 */
export const deleteGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await prisma.game.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

/**
 * Get all games for frontend (same as getAllGames).
 */
export const getAllGamesFrontend = getAllGames;