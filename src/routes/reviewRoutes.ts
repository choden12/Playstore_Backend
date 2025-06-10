import { Router } from "express";
import { body, param } from "express-validator";
import { createReview, listReviews } from "../controllers/reviewController";
// import { protect } from "../middleware/auth";

const router = Router();

// POST /api/v1/reviews
router.post(
  "/",
  [
    body("gameId").isInt().withMessage("gameId must be an integer"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("rating must be 1-5"),
    body("text").isLength({ min: 1 }).withMessage("text is required"),
  ],
  createReview
);

// GET /api/v1/reviews/game/:gameId
router.get(
  "/game/:gameId",
  [param("gameId").isInt().withMessage("gameId must be an integer")],
  listReviews
);

export default router;
