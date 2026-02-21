import {Router} from 'express';
const postRouter = Router();
import * as postController from '../controllers/postsController.js';


postRouter.get('/', postController.allPosts); 
postRouter.get('/add', postController.goToAddPost); 
postRouter.post('/add', postController.addPost); 
postRouter.put('/update/:id', postController.updatePost); 
postRouter.get('/:id', postController.inspectPost); 

export default postRouter;