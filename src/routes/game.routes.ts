import { Router } from 'express';
import * as gameController from '../controllers/game.controller';
import { validateGame } from '../middleware/game.middleware';

const router = Router();

// Get all games
router.get('/', gameController.getAllGames);

// Get game by ID
router.get('/:id', gameController.getGameById);

// Create a new game
router.post('/', validateGame, gameController.createGame);

// Update an existing game
router.put('/:id', validateGame, gameController.updateGame);

// Delete a game
router.delete('/:id', gameController.deleteGame);

// Get all games for frontend (with name/tags)
router.get('/frontend/games', gameController.getAllGamesFrontend);

export default router;