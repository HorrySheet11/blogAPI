import {Router} from 'express';
const router = Router();

router.use('/user', require('./usersRouter.js'));
router.use('/post', require('./postsRouter.js'));

export default router;