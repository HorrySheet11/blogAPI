import { prisma } from "../config/prisma.js";

export async function getAllUsers() {
	return await prisma.user.findMany();
}

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

export async function saveRefreshToken(id, token) {
	// return await prisma.tokens.create({
	//   data: {
	//     userId: id,
	//     refreshToken: token
	//   }
	// })
	// console.log(id,token);
	return;
}

export async function findBlogById(id){
	return await prisma.blog.findUnique({
		where: {
			id: parseInt(id, 10),
		},
		include: {
			author: {
				select: {
					id: true,
					name: true
				}
			}
		}
	})
}


export async function findUserById(id){
  return await prisma.user.findUnique({
    where: {
      id: parseInt(id, 10),
    },
		include: {
			blog: true
		}
  })
}
