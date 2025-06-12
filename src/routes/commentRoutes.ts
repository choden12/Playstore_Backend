import { Router } from "express";
import { body, param } from "express-validator";
import { createComment } from "../controllers/commentController";
import { getCommentsForReview } from "../controllers/commentController";
// import { protect } from "../middleware/auth";

const router = Router();

// POST /api/v1/comments
router.post(
  "/",
  [
    body("reviewId").isInt().withMessage("reviewId must be an integer"),
    body("text").isLength({ min: 1 }).withMessage("text is required"),
  ],
  createComment
);

// GET /api/v1/comments/review/:reviewId
router.get(
  "/review/:reviewId",
  [param("reviewId").isInt().withMessage("reviewId must be an integer")],
  getCommentsForReview
);

export default router;
