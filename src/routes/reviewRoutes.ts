import { Router } from "express";
import { body, param } from "express-validator";
import {
  createReview,
  listReviews,
  getReviewStats,
} from "../controllers/reviewController";
// import { protect } from "../middleware/auth";

const router = Router();

// Helper to wrap async route handlers
const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// POST /api/v1/reviews
router.post(
  "/",
  [
    body("gameId").isInt().withMessage("gameId must be an integer"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("rating must be 1-5"),
    body("text").isLength({ min: 1 }).withMessage("text is required"),
    body("userId").isInt().withMessage("userId must be an integer"),
  ],
  asyncHandler(createReview)
);

// GET /api/v1/reviews/game/:gameId
router.get(
  "/game/:gameId",
  [param("gameId").isInt().withMessage("gameId must be an integer")],
  asyncHandler(listReviews)
);

// GET /api/reviews/stats/:gameId
router.get(
  "/stats/:gameId",
  [param("gameId").isInt().withMessage("gameId must be an integer")],
  asyncHandler(getReviewStats)
);

export default router;
