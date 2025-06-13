import { Request, Response, NextFunction } from "express";
import {
  createUser,
  findUserByEmail,
  validatePassword,
  generateToken,
} from "../services/userService";
import { prisma } from "../utils/prisma.util";
import Joi from "joi";
import { formatError } from "../utils/error.util";

/**
 * Joi schema for user validation.
 */
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

/**
 * User signup controller.
 */
export async function signup(req: Request, res: Response, next?: NextFunction) {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(formatError(400, "Validation error", error.details.map((d) => d.message)));
    }
    const { email, password } = req.body;
    const existing = await findUserByEmail(email);
    if (existing)
      return res.status(409).json(formatError(409, "Conflict", ["Email already registered."]));

    const user = await createUser(email, password);
    const token = generateToken(user);
    res.status(201).json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    next?.(err);
  }
}

/**
 * User login controller.
 */
export async function login(req: Request, res: Response, next?: NextFunction) {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(formatError(400, "Validation error", error.details.map((d) => d.message)));
    }
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user)
      return res.status(401).json(formatError(401, "Unauthorized", ["Invalid credentials."]));

    const valid = await validatePassword(password, user.password);
    if (!valid)
      return res.status(401).json(formatError(401, "Unauthorized", ["Invalid credentials."]));

    const token = generateToken(user);
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    next?.(err);
  }
}

/**
 * Get all users (admin only).
 * @route GET /api/v1/users
 * @access Protected (JWT, admin)
 */
export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    if (!req.user?.isAdmin) {
      return res.status(403).json(formatError(403, "Forbidden", ["Admin only"]));
    }
    const users = await prisma.user.findMany({ select: { id: true, email: true } });
    res.json({ users });
  } catch (err) {
    next(err);
  }
}

/**
 * Get a user by ID.
 * @route GET /api/v1/users/:id
 * @access Protected (JWT)
 */
export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json(formatError(400, "Invalid ID", ["User ID must be a number"]));
    }
    // @ts-ignore
    if (req.user?.id !== id && !req.user?.isAdmin) {
      return res.status(403).json(formatError(403, "Forbidden", ["Not allowed"]));
    }
    const user = await prisma.user.findUnique({ where: { id }, select: { id: true, email: true } });
    if (!user)
      return res.status(404).json(formatError(404, "Not found", ["User not found"]));
    res.json(user);
  } catch (err) {
    next(err);
  }
}

/**
 * Update a user.
 * @route PUT /api/v1/users/:id
 * @access Protected (JWT)
 */
export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json(formatError(400, "Invalid ID", ["User ID must be a number"]));
    }
    // @ts-ignore
    if (req.user?.id !== id && !req.user?.isAdmin) {
      return res.status(403).json(formatError(403, "Forbidden", ["Not allowed"]));
    }
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(formatError(400, "Validation error", error.details.map((d) => d.message)));
    }
    const { email, password } = req.body;
    const updated = await prisma.user.update({
      where: { id },
      data: { email, password },
      select: { id: true, email: true },
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

/**
 * Delete a user.
 * @route DELETE /api/v1/users/:id
 * @access Protected (JWT, admin)
 */
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    // @ts-ignore
    if (!req.user?.isAdmin) {
      return res.status(403).json(formatError(403, "Forbidden", ["Admin only"]));
    }
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
