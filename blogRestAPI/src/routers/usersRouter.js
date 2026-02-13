import {Router} from 'express';
const userRouter = Router();
import * as userController from '../controllers/usersController.js';

userRouter.post('/logIn', userController.loginPost);
userRouter.get('/logOut', userController.logout);
userRouter.post('/sign-up',  userController.signUpPost);

export default userRouter;