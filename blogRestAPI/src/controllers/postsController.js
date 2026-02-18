import {findPostById,findAllPosts } from "../models/Post.js";

export async function inspectPost(req,res){
  const result = await findPostById(parseInt(req.params.id, 10));
  return res.json(result);
}

export async function allPosts(req,res){
  const result = await findAllPosts();
  res.json(result);
}