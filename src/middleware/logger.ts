import { Request, Response, NextFunction } from "express";

/**
 * Simple logger middleware.
 * Logs the HTTP method, path, and timestamp for every request.
 */
export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};
