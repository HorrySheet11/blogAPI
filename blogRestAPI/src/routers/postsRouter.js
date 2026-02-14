import {Router} from 'express';
const postRouter = Router();
import * as postController from '../controllers/postsController.js';

postRouter.post('/all', postController.allPosts); 
postRouter.post('/:id', postController.inspectPost); 

export default postRouter;