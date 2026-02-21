import {findPostById,findAllPosts,createPost, reformPost } from "../models/Post.js";

export async function inspectPost(req,res){
  const result = await findPostById(parseInt(req.params.id, 10));
  return res.json(result);
}

export async function allPosts(req,res){
  const result = await findAllPosts();
  res.json(result);
}

export async function addPost(req,res){
  console.log(req.body.postData);
  try {
    const { title, content, isPublished, blogId } = req.body.postData;
    const result = await createPost(title, content, isPublished, blogId);
    res.json(result);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add post" });
  }
}

export async function updatePost(req,res){
  const {id} = req.params;
  try {
    const { title, content, isPublished, blogId } = req.body.postData;
    console.log( title, content, isPublished, blogId, id )
    const result = await reformPost(title, content, isPublished, blogId, id);
    res.json(result);
  } catch (error) {
        console.log(error);
    res.status(500).json({ error: "Failed to add post" });

  }
}