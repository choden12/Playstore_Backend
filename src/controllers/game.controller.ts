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
 * Default games to always return for GET /api/v1/games.
 */
const DEFAULT_GAMES = [
  { id: 1, image: '/mlbb.png', name: 'Mobile Legends: Bang Bang', tags: 'Action · Strategy · MOBA · Battling', rating: 4.0, category: 'Action' },
  { id: 2, image: '/superbear.png', name: 'Super Bear Adventure', tags: 'Adventure · Action · Casual · Offline', rating: 4.4, category: 'Adventure' },
  { id: 3, image: '/iamcat.png', name: 'I Am Cat', tags: 'Simulation · Life · Casual · Offline', rating: 4.4, category: 'Simulation' },
  { id: 4, image: '/blockblast.jpg', name: 'Block Blast!', tags: 'Puzzle · Block · Casual · Offline', rating: 4.8, category: 'Puzzle' },
  { id: 5, image: '/craftsman.png', name: 'Craftsman: Building Craft', tags: 'Simulation · Sandbox · Single player', rating: 3.4, category: 'Simulation' },
  { id: 6, image: '/pubg.png', name: 'PUBG MOBILE', tags: 'Action · Tactical shooter · Multiplayer', rating: 4.4, category: 'Action' },
  { id: 7, image: '/gameworld.png', name: 'Game World: Life Story', tags: 'Educational · Simulation · Life · Casual', rating: 4.7, category: 'Educational' },
  { id: 8, image: '/holeio.png', name: 'Hole.io', tags: 'Arcade · Action · IO game · Casual', rating: 3.2, category: 'Arcade' },
  { id: 9, image: '/stickman.png', name: 'Stickman Party 234 MiniGames', tags: 'Arcade · Board · Party · Casual', rating: 4.5, category: 'Arcade' },
];

/**
 * Get all games (always returns only the 9 default games).
 */
export const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  res.json(DEFAULT_GAMES);
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