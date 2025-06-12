import { Request, Response } from "express";

// Example static games data
const games = [
  { id: 1, image: '/mlbb.png', name: 'Mobile Legends: Bang Bang', tags: 'Action · Strategy · MOBA · Battling', rating: 4.0 },
  { id: 2, image: '/superbear.png', name: 'Super Bear Adventure', tags: 'Adventure · Action · Casual · Offline', rating: 4.4 },
  { id: 3, image: '/iamcat.png', name: 'I Am Cat', tags: 'Simulation · Life · Casual · Offline', rating: 4.4 },
  { id: 4, image: '/blockblast.jpg', name: 'Block Blast!', tags: 'Puzzle · Block · Casual · Offline', rating: 4.8 },
  { id: 5, image: '/craftsman.png', name: 'Craftsman: Building Craft', tags: 'Simulation · Sandbox · Single player', rating: 3.4 },
  { id: 6, image: '/pubg.png', name: 'PUBG MOBILE', tags: 'Action · Tactical shooter · Multiplayer', rating: 4.4 },
  { id: 7, image: '/gameworld.png', name: 'Game World: Life Story', tags: 'Educational · Simulation · Life · Casual', rating: 4.7 },
  { id: 8, image: '/holeio.png', name: 'Hole.io', tags: 'Arcade · Action · IO game · Casual', rating: 3.2 },
  { id: 9, image: '/stickman.png', name: 'Stickman Party 234 MiniGames', tags: 'Arcade · Board · Party · Casual', rating: 4.5 },
];

// Get all games
export const getAllGames = (req: Request, res: Response) => {
  res.json(games);
};

// Get a game by ID
export const getGameById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const game = games.find(g => g.id === id);
  if (!game) {
    res.status(404).json({ error: "Game not found" });
    return;
  }
  res.json(game);
};

// Create a new game (in-memory only)
export const createGame = (req: Request, res: Response) => {
  const { name, image, tags, rating } = req.body;
  if (!name || !image || !tags || typeof rating !== "number") {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  const newGame = { id: Date.now(), name, image, tags, rating };
  games.push(newGame);
  res.status(201).json(newGame);
};

// Update a game (in-memory only)
export const updateGame = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const idx = games.findIndex(g => g.id === id);
  if (idx === -1) {
    res.status(404).json({ error: "Game not found" });
    return;
  }
  const { name, image, tags, rating } = req.body;
  games[idx] = { ...games[idx], name, image, tags, rating };
  res.json(games[idx]);
};

// Delete a game (in-memory only)
export const deleteGame = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const idx = games.findIndex(g => g.id === id);
  if (idx === -1) {
    res.status(404).json({ error: "Game not found" });
    return;
  }
  games.splice(idx, 1);
  res.status(204).send();
};

// Get all games for frontend (same as getAllGames)
export const getAllGamesFrontend = (req: Request, res: Response) => {
  res.json(games);
};