// /routes/postRoutes.js
import express from 'express';
import * as PostController from '../controllers/PostController.js';
import checkAuth from '../middlewares/checkAuth.js';
import {postCreateValidation} from '../validations/validations.js';
import handelValidationsErrors from '../middlewares/handleValidationsErrors.js';

const router = express.Router();
router.get('/', PostController.getAll);
router.get('/:id', PostController.getOne);
router.post('/', checkAuth, postCreateValidation, handelValidationsErrors, PostController.create);
router.delete('/:id', checkAuth, PostController.remove);
router.patch('/:id', checkAuth, postCreateValidation, handelValidationsErrors, PostController.update);
export default router;
