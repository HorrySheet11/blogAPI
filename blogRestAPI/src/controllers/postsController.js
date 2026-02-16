import {findPostById,findAllPosts } from "../models/Post.js";

export async function inspectPost(req,res){
  const result = await findPostById(req.params.id);
  return res.json(result);
}

export async function allPosts(req,res){
  const result = await findAllPosts();
  return res.json(result);
}