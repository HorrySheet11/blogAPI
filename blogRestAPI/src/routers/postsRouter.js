import { Router } from "express";
import * as postController from "../controllers/postsController.js";
import { authenticate } from "../middleware/auth.js";

const postRouter = Router();

postRouter.get("/", postController.allPosts);
postRouter.get("/add", authenticate, postController.goToAddPost);
postRouter.post("/add", postController.addPost);
postRouter.put("/update/:id", postController.updatePost);
postRouter.get("/:id", authenticate, postController.inspectPost);

export default postRouter;
