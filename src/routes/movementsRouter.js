import { Router } from 'express';
import { getMovements, newMovement } from '../controllers/movementsController.js';
import tokenValidation from '../middlewares/tokenValidation.js';
import movementValidationSchema from '../middlewares/movementValidationSchema.js';

const router = Router();
router.get('/movements', tokenValidation, getMovements);
router.post('/movements', tokenValidation, movementValidationSchema, newMovement);
export default router;
