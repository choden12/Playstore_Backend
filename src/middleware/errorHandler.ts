import { Request, Response, NextFunction } from "express";

/**
 * Central error handler middleware.
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      code: status,
      message: err.message || "Internal Server Error",
      details: err.details || null,
    },
  });
};
