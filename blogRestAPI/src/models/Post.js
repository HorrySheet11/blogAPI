import {prisma} from '../config/prisma.js';

export async function findPostById(id) {
  return await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
}

export async function findAllPosts() {
  return await prisma.post.findMany();
}