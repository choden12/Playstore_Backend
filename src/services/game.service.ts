import { Game } from '../models/game.model';

let games: Game[] = [
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

export const getAllGames = () => games;

export const getGameById = (id: number) => games.find(g => g.id === id);

export const createGame = (game: Omit<Game, 'id'>) => {
  const newGame: Game = { id: Date.now(), ...game };
  games.push(newGame);
  return newGame;
};

export const updateGame = (id: number, data: Partial<Omit<Game, 'id'>>) => {
  const idx = games.findIndex(g => g.id === id);
  if (idx === -1) return null;
  games[idx] = { ...games[idx], ...data };
  return games[idx];
};

export const deleteGame = (id: number) => {
  const idx = games.findIndex(g => g.id === id);
  if (idx === -1) return false;
  games.splice(idx, 1);
  return true;
};
