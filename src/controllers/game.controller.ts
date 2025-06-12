import { Request, Response } from 'express';
import * as gameService from '../services/game.service';

export const getAllGames = (req: Request, res: Response): void => {
  res.json(gameService.getAllGames());
};

export const getGameById = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const game = gameService.getGameById(id);
  if (!game) {
    res.status(404).json({ error: 'Game not found' });
    return;
  }
  res.json(game);
};

export const createGame = (req: Request, res: Response): void => {
  const { image, name, tags, rating } = req.body;
  if (!image || !name || !tags || typeof rating !== 'number') {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  const game = gameService.createGame({ image, name, tags, rating });
  res.status(201).json(game);
};

export const updateGame = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const { image, name, tags, rating } = req.body;
  const updated = gameService.updateGame(id, { image, name, tags, rating });
  if (!updated) {
    res.status(404).json({ error: 'Game not found' });
    return;
  }
  res.json(updated);
};

export const deleteGame = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const deleted = gameService.deleteGame(id);
  if (!deleted) {
    res.status(404).json({ error: 'Game not found' });
    return;
  }
  res.status(204).send();
};
