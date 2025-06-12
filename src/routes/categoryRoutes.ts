import { Router } from "express";
import * as categoryController from "../controllers/categoryController";
import {
  validateCategory,
  validateCategoryId,
} from "../middleware/category.middleware";

const router = Router();

// Helper to wrap async route handlers
const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get("/", asyncHandler(categoryController.getAllCategories));
router.get(
  "/:id",
  asyncHandler(categoryController.getCategoryById)
);
router.post(
  "/",
  asyncHandler(categoryController.createCategory)
);
router.put(
  "/:id",
  asyncHandler(categoryController.updateCategory)
);
router.delete(
  "/:id",
  asyncHandler(categoryController.deleteCategory)
);

export default router;
