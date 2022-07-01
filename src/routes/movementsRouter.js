import { Router } from 'express';
import { getMovements, newMovement, updateMovement, deleteMovement } from '../controllers/movementsController.js';
import tokenValidation from '../middlewares/tokenValidation.js';
import movementValidationSchema from '../middlewares/movementValidationSchema.js';
import movementIdValidation from '../middlewares/movementIdValidation.js';

const router = Router();
router.get('/movements', tokenValidation, getMovements);
router.post('/movements', tokenValidation, movementValidationSchema, newMovement);
router.put('/movements/:id', tokenValidation, movementIdValidation, movementValidationSchema, updateMovement);
router.delete('/movements/:id', tokenValidation, movementIdValidation, deleteMovement);
export default router;
