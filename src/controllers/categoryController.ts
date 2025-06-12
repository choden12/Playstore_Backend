import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

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
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    next(err);
  }
}

/**
 * Create a new category.
 */
export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
}

/**
 * Update a category.
 */
export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
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
