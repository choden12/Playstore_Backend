import { PrismaClient } from "../generated/prisma";

/**
 * Singleton Prisma client for database access.
 */
export const prisma = new PrismaClient();
