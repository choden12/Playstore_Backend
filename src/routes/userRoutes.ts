import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

// Helper to wrap async route handlers
const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/signup', asyncHandler(userController.signup));
router.post('/login', asyncHandler(userController.login));

export default router;
