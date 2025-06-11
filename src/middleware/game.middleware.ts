import { Request, Response, NextFunction } from 'express';

export const validateGame = (req: Request, res: Response, next: NextFunction): void => {
  const { image, name, tags, rating } = req.body;
  if (!image || !name || !tags || typeof rating !== 'number') {
    res.status(400).json({ error: 'Missing or invalid fields' });
    return;
  }
  next();
};
