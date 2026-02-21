import {Router} from 'express';
const postRouter = Router();
import * as postController from '../controllers/postsController.js';


postRouter.get('/', postController.allPosts); 
postRouter.post('/add', postController.addPost); 
postRouter.get('/:id', postController.inspectPost); 
postRouter.put('/update/:id', postController.updatePost); 
//FIXME: Cannot PUT /post/update/1
export default postRouter;