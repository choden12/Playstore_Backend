import { Router } from 'express';
import * as gameController from '../controllers/game.controller';
import { validateGame } from '../middleware/game.middleware';

const router = Router();

// Get all games
router.get('/games', gameController.getAllGames);

// Get game by ID
router.get('/games/:id', gameController.getGameById);

// Create a new game
router.post('/games', validateGame, gameController.createGame);

// Update an existing game
router.put('/games/:id', validateGame, gameController.updateGame);

// Delete a game
router.delete('/games/:id', gameController.deleteGame);

export default router;