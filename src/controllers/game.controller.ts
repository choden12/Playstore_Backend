import { Request, Response } from 'express';
import * as gameService from '../services/game.service';

export const getAllGames = async (req: Request, res: Response) => {
  const games = await gameService.getAllGames();
  res.json(games);
};
