import { Router, Request, Response, NextFunction } from 'express';
import * as gameController from '../controllers/game.controller';

const router = Router();

// Async handler to catch errors in async route handlers
const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Game endpoints
router.get('/', asyncHandler(gameController.getAllGames));
router.get('/:id', asyncHandler(gameController.getGameById));
router.post('/', asyncHandler(gameController.createGame));
router.put('/:id', asyncHandler(gameController.updateGame));
router.delete('/:id', asyncHandler(gameController.deleteGame));

export default router;
