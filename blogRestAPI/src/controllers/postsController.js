import {findPostById,findAllPosts,createPost } from "../models/Post.js";

export async function inspectPost(req,res){
  const result = await findPostById(parseInt(req.params.id, 10));
  return res.json(result);
}

export async function allPosts(req,res){
  const result = await findAllPosts();
  res.json(result);
}

export async function addPost(req,res){
  console.log(req.body);
  try {
    const { title, content, isPublished, blogId } = req.body;
    const result = await createPost(title, content, isPublished, blogId);
    res.json(result);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add post" });
  }
}