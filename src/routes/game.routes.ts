import { Router } from 'express';
import * as gameController from '../controllers/game.controller';
import { validateGame } from '../middleware/game.middleware';

const router = Router();

// Helper to wrap async route handlers
const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Get all games
router.get('/', asyncHandler(gameController.getAllGames));

// Get game by ID
router.get('/:id', asyncHandler(gameController.getGameById));

// Create a new game
router.post('/', validateGame, asyncHandler(gameController.createGame));

// Update an existing game
router.put('/:id', validateGame, asyncHandler(gameController.updateGame));

// Delete a game
router.delete('/:id', asyncHandler(gameController.deleteGame));

// Get all games for frontend (with name/tags)
router.get('/frontend/games', asyncHandler(gameController.getAllGamesFrontend));

export default router;