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

export async function createPost(title, content, isPublished, blogId) {
  return await prisma.post.create({
    data: {
      title: title,
      content: content,
      isPublished: isPublished,
      blog: {
        connect: {
          id: blogId,
        },
      },
    },
  });
}

export async function reformPost(title, content, isPublished, blogId, id) {
  return await prisma.post.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      title: title,
      content: content,
      isPublished: isPublished,
      blog: {
        connect: {
          id: parseInt(blogId, 10),
        },
      },
    },
  })
}