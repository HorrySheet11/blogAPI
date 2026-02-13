import {findPostById } from "../models/Post.js";


export async function inspectPost(req,res){
  const result = findPostById(req.params.id);
  res.json(result);
}