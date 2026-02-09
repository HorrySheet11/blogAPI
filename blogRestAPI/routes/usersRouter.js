import {Router} from 'express';
import userController from '../controllers/usersController';
const userRouter = Router();

userRouter.get('/', userController.home);
userRouter.get('/logIn', userController.loginGet);
userRouter.post('/logIn', userController.loginPost);
userRouter.get('/logOut', userController.logout);
userRouter.get('/sign-up', userController.signUpGet);
userRouter.post('/sign-up', userController.signUpPost);

export default userRouter;