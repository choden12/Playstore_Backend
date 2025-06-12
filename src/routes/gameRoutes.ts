import { Router } from "express";

const router = Router();

const games = [
  {
    id: 1,
    title: "Block Blast",
    category: "Puzzle • Block",
    rating: 4.8,
    image: "/game1.jpg",
    icon: "/game1-icon.jpg",
    description:
      "Block Blast is a colorful, fun, and highly addictive offline block puzzle game that combines the best of casual gameplay and brain training. Designed for everyone, this relaxing game is perfect whether you are a fan of logic puzzles, match-3 challenges, or just want a few minutes of simple fun. With intuitive drag-and-drop controls, stunning graphics, and challenging yet satisfying levels, it’s an ideal choice for unwinding and sharpening your mind.",
    comment: "This game is awesome.",
  },
  {
    id: 2,
    title: "Stickman Party 234 MiniGames",
    category: "Arcade • Board",
    rating: 4.5,
    image: "/game2.jpg",
    icon: "/game2-icon.jpg",
    description:
      "Stickman Party is a collection of fun and competitive mini-games designed for single-player or local multiplayer with friends. From racing and soccer to tank battles and strategy games, it offers a diverse mix of gameplay styles to keep you entertained for hours. Easy to pick up and play, it's ideal for parties, family game nights, or casual battles between friends. Each mini-game brings its own twist, ensuring variety and laughter every time you play.",
    comment: "This is nice game i have had",
  },
  {
    id: 3,
    title: "Super Bear Adventure",
    category: "Adventure • Action",
    rating: 4.4,
    image: "/game3.jpg",
    icon: "/game3-icon.jpg",
    description:
      "Super Bear Adventure is a charming 3D platformer where you play as a brave little bear exploring a vibrant open world filled with secrets, enemies, and puzzles. Inspired by classic games like Super Mario 64 and Banjo-Kazooie, it features smooth controls, collectible quests, and whimsical characters. Travel across lush forests, snowy peaks, and hidden dungeons while uncovering the mystery behind your kidnapped bear friends and restoring peace to the animal kingdom.",
    comment: "very good",
  },
  {
    id: 4,
    title: "Usagi Shima: Cute Bunny Game",
    category: "Simulation • Management",
    rating: 4.7,
    image: "/game4.jpg",
    icon: "/game4-icon.jpg",
  },
  {
    id: 5,
    title: "Honkai: Star Rail",
    category: "Adventure • RPG",
    rating: 3.4,
    image: "/game5.jpg",
    icon: "/game5-icon.jpg",
  },
  {
    id: 6,
    title: "Genshin Impact",
    category: "Adventure • Role Playing",
    rating: 3.9,
    image: "/game6.jpg",
    icon: "/game6-icon.jpg",
  },
  {
    id: 7,
    title: "Gacha Life",
    category: "Casual • Simulation",
    rating: 4.4,
    image: "/game7.jpg",
    icon: "/game7-icon.jpg",
  },
  {
    id: 8,
    title: "Alto's Adventure",
    category: "Action • Racing",
    rating: 4.5,
    image: "/game8.jpg",
    icon: "/game8-icon.jpg",
  },
  {
    id: 9,
    title: "Among Us",
    category: "Action • Strategy",
    rating: 3.8,
    image: "/game9.jpg",
    icon: "/game9-icon.jpg",
  },
  {
    id: 10,
    title: "Clusterduck",
    category: "Simulation • Idle",
    rating: 4.7,
    image: "/game10.jpg",
    icon: "/game10-icon.jpg",
  },
  {
    id: 11,
    title: "Billionaire Chef: Idle Tycoon",
    category: "Simulation • Restaurant",
    rating: 3.8,
    image: "/game11.jpg",
    icon: "/game11-icon.jpg",
  },
  {
    id: 12,
    title: "Pondlife - Relaxing Fish Game",
    category: "Simulation • Care",
    rating: 4.5,
    image: "/game12.jpg",
    icon: "/game12-icon.jpg",
  },
];

router.get("/games", (req, res) => {
  res.json(games);
});

export default router;
