import {prisma} from '../config/prisma.js';

export async function findPostById(id) {
  return await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
}

export function findAllPosts() {
  return prisma.post.findMany();
}