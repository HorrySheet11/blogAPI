import prisma from '../config/prisma.js';

export async function getAllUsers() {
  return await prisma.user.findMany();
}