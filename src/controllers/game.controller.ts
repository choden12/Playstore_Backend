import { Request, Response } from 'express';
import * as gameService from '../services/game.service';

export const getAllGames = async (req: Request, res: Response) => {
  const games = await gameService.getAllGames();
  res.json(games);
};

export const getGameById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
  const game = await gameService.getGameById(id);
  if (!game) return res.status(404).json({ error: 'Game not found' });
  res.json(game);
};

export const createGame = async (req: Request, res: Response) => {
  const { image, name, tags, rating, categoryId } = req.body;
  if (!image || !name || !tags || !rating || !categoryId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const game = await gameService.createGame({ image, name, tags, rating, categoryId });
  res.status(201).json(game);
};

export const updateGame = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
  const { image, name, tags, rating, categoryId } = req.body;
  if (!image && !name && !tags && !rating && !categoryId) {
    return res.status(400).json({ error: 'No fields to update' });
  }
  try {
    const game = await gameService.updateGame(id, { image, name, tags, rating, categoryId });
    res.json(game);
  } catch {
    res.status(404).json({ error: 'Game not found' });
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    await gameService.deleteGame(id);
    res.status(204).send();
  } catch {
    res.status(404).json({ error: 'Game not found' });
  }
};
