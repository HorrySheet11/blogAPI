import {Router} from 'express';
import * as userController from '../controllers/usersController.js';
const userRouter = Router();

userRouter.post('/logIn', userController.loginPost);
userRouter.get('/logOut', userController.logout);
userRouter.post('/sign-up',  userController.signUpPost);

export default userRouter;