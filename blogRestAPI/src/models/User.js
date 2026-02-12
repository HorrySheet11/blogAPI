import {prisma} from '../config/prisma.js';

export async function getAllUsers() {
  return await prisma.user.findMany();
}

//TODO: make all other functions

export async function createUser(user) {
  return await prisma.user.create({
    data: user,
  });
}

export async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export async function saveRefreshToken(id, token){
  // return await prisma.tokens.create({
  //   data: {
  //     userId: id,
  //     refreshToken: token
  //   }
  // })
  console.log(id,token);
  return ;
}