import { Router } from "express";
import { body, param } from "express-validator";
import {
  createComment,
  getCommentsForGame,
} from "../controllers/commentController";

const router = Router();

// POST /api/comments
router.post(
  "/",
  [
    body("gameId").isInt().withMessage("gameId must be an integer"),
    body("text").isLength({ min: 1 }).withMessage("text is required"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("rating must be 1-5"),
    body("userId").isInt().withMessage("userId must be an integer"),
  ],
  (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => {
    Promise.resolve(createComment(req, res, next)).catch(next);
  }
);

// GET /api/comments/game/:gameId
router.get(
  "/game/:gameId",
  [param("gameId").isInt().withMessage("gameId must be an integer")],
  getCommentsForGame
);

export default router;
