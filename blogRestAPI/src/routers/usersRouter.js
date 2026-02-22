import {Router} from 'express';
const userRouter = Router();
import * as userController from '../controllers/usersController.js';

userRouter.post('/log-in' , userController.login);
userRouter.post('/log-out', userController.logout);
userRouter.post('/sign-up',  userController.signUp);
userRouter.get('/refresh', userController.refreshToken);
userRouter.get('/:id', userController.getUser);
userRouter.get('/blog/:id', userController.getBlogAuthor);
userRouter.post('/managePost', userController.addTokenData);
userRouter.get('/validate/:jti', userController.validateToken);

export default userRouter;