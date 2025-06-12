import { Request, Response, NextFunction } from 'express';
import { createUser, findUserByEmail, validatePassword, generateToken } from '../services/userService';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function signup(req: Request, res: Response, next?: NextFunction) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password || !validateEmail(email) || password.length < 6) {
      return res.status(400).json({ message: 'Invalid email or password (min 6 chars).' });
    }
    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ message: 'Email already registered.' });

    const user = await createUser(email, password);
    const token = generateToken(user);
    res.status(201).json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

export async function login(req: Request, res: Response, next?: NextFunction) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

    const valid = await validatePassword(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials.' });

    const token = generateToken(user);
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error('Login error:', err); // Add this line for debugging
    res.status(500).json({ message: 'Internal server error.' });
  }
}
