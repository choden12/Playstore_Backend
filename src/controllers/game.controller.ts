import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

/**
 * Get all games.
 */
export const getAllGames = async (req: Request, res: Response) => {
  const games = await prisma.game.findMany();
  res.json(games);
};

/**
 * Get a game by ID.
 */
export const getGameById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const game = await prisma.game.findUnique({ where: { id } });
  if (!game) {
    res.status(404).json({ error: "Game not found" });
    return;
  }
  res.json(game);
};

/**
 * Create a new game.
 */
export const createGame = async (req: Request, res: Response) => {
  const { image, name, tags, rating, category } = req.body;
  if (!image || !name || !tags || typeof rating !== "number" || !category) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  const game = await prisma.game.create({
    data: { image, name, tags, rating, category },
  });
  res.status(201).json(game);
};

/**
 * Update a game.
 */
export const updateGame = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { image, name, tags, rating, category } = req.body;
  try {
    const updated = await prisma.game.update({
      where: { id },
      data: { image, name, tags, rating, category },
    });
    res.json(updated);
  } catch {
    res.status(404).json({ error: "Game not found" });
  }
};

/**
 * Delete a game.
 */
export const deleteGame = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.game.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Game not found" });
  }
};
