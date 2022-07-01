import { Router } from 'express';
import authRouter from './routes/authRouter.js';
import movementsRouter from './routes/movementsRouter.js';

const router = Router();
router.use(authRouter);
router.use(movementsRouter);
export default router;
