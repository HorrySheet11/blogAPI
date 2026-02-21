import {Router} from 'express';
const postRouter = Router();
import * as postController from '../controllers/postsController.js';


postRouter.get('/', postController.allPosts); 
postRouter.post('/add', postController.addPost); 
postRouter.put('/update/:id', postController.updatePost); 
postRouter.get('/:id', postController.inspectPost); 
//FIXME: Cannot PUT /post/update/1
export default postRouter;