import {Router} from 'express';
const userRouter = Router();
import * as userController from '../controllers/usersController.js';

userRouter.post('/log-in', userController.loginPost);
userRouter.get('/log-out', userController.logout);
userRouter.post('/sign-up',  userController.signUpPost);

export default userRouter;