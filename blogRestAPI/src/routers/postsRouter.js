import {Router} from 'express';
const postRouter = Router();
import * as postController from '../controllers/postsController.js';

postRouter.post('/:id', postController.inspectPost);

export default postRouter;