import {
	createPost,
	findAllPosts,
	findPostById,
	reformPost,
} from "../models/Post.js";

export async function inspectPost(req, res) {
	const result = await findPostById(parseInt(req.params.id, 10));
	return res.json(result);
}

export async function allPosts(req, res) {
	const result = await findAllPosts();
	res.json(result);
}

export async function addPost(req, res) {
	try {
		const { title, content, isPublished, blogId } = req.body.postData;
		const result = await createPost(
			title,
			content,
			isPublished,
			parseInt(blogId, 10),
		);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Failed to add post" });
	}
}

export async function updatePost(req, res) {
	const { id } = req.params;
	try {
		const { title, content, isPublished, blogId } = req.body.postData;
		const result = await reformPost(title, content, isPublished, blogId, id);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Failed to add post" });
	}
}

export async function goToAddPost(req, res) {
	const auth = req.headers.authorization;
	res.status(200).json({ message: "User authorized!", success: true });
}

