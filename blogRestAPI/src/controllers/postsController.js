import {findPostById } from "../models/Post.js";
import {prisma} from "../config/prisma.js";

export async function inspectPost(req,res){
  const result = findPostById(req.params.id);
  return res.json(result);
}

export async function allPosts(req,res){
  const result = await prisma.post.findMany();
  return res.json(result);
}