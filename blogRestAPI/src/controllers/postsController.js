import {findPostById } from "../models/Post.js";


export async function inspectPost(req,res){
  const result = findPostById(req.params.id);
  res.json(result);
}

export async function allPosts(req,res){
  const result = await prisma.post.findMany();
  res.json(result);
}