import {Router} from 'express';
import userController from '../controllers/usersController';
const userRouter = Router();


userRouter.post('/logIn', userController.loginPost);
userRouter.get('/logOut', userController.logout);
userRouter.post('/sign-up', userController.signUpPost);

export default userRouter;