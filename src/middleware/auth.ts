import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate JWT tokens.
 */
export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    // No token found in header
    return res.status(401).json({ message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    // Verify token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    (req as any).user = decoded; // Attach user info to request
    next();
  } catch {
    // Token invalid or expired
    res.status(401).json({ message: 'Invalid token.' });
  }
}
