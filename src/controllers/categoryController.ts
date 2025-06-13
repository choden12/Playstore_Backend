import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/prisma.util";
import Joi from "joi";
import { formatError } from "../utils/error.util";

/**
 * Joi schema for category validation.
 */
const categorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
});

/**
 * Get all categories.
 */
export async function getAllCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (err) {
    next(err);
  }
}

/**
 * Get a category by ID.
 */
export async function getCategoryById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json(formatError(400, "Invalid ID", ["Category ID must be a number"]));
    }
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category)
      return res
        .status(404)
        .json(formatError(404, "Not found", ["Category not found"]));
    res.json(category);
  } catch (err) {
    next(err);
  }
}

/**
 * Create a new category.
 * @route POST /api/v1/categories
 * @access Protected (JWT)
 */
export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(
          formatError(
            400,
            "Validation error",
            error.details.map((d) => d.message)
          )
        );
    }
    const { name } = req.body;
    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
}

/**
 * Update a category.
 * @route PUT /api/v1/categories/:id
 * @access Protected (JWT)
 */
export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(
          formatError(
            400,
            "Validation error",
            error.details.map((d) => d.message)
          )
        );
    }
    const { name } = req.body;
    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });
    res.json(category);
  } catch (err) {
    next(err);
  }
}

/**
 * Delete a category.
 * @route DELETE /api/v1/categories/:id
 * @access Protected (JWT)
 */
export async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    await prisma.category.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
