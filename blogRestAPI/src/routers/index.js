import {Router} from 'express';
const router = Router();
import usersRouter from './usersRouter.js';
import postsRouter from './postsRouter.js';

router.use('/user', usersRouter);
router.use('/post', postsRouter);

export default router;