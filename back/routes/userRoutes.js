// /routes/userRoutes.js
import express from 'express';
import * as UserController from '../controllers/UserController.js';
import {loginValidation, registerValidation} from '../validations/validations.js';
import handelValidationsErrors from '../middlewares/handleValidationsErrors.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();
router.post('/login', loginValidation, handelValidationsErrors, UserController.login);
router.post('/register', registerValidation, handelValidationsErrors, UserController.register);
router.get('/me', checkAuth, UserController.getMe);
export default router;
