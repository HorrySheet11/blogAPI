import {Router} from 'express';
const postRouter = Router();
import * as postController from '../controllers/postsController.js';


postRouter.get('/', postController.allPosts); 
postRouter.post('/add', postController.addPost); 
postRouter.get('/:id', postController.inspectPost); 

export default postRouter;