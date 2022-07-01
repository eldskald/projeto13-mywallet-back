import { Router } from 'express';
import { getMovements } from '../controllers/movementsController.js';
import tokenValidation from '../middlewares/tokenValidation.js';

const router = Router();
router.get('/movements', tokenValidation, getMovements);
export default router;
