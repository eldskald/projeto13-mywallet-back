import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController.js';
import signinValidation from '../middlewares/signinValidation.js';
import signupValidation from '../middlewares/signupValidation.js';

const router = Router();
router.post('/sign-in', signinValidation, signIn);
router.post('/sign-up', signupValidation, signUp);
export default router;
