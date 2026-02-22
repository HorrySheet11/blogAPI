import {prisma} from '../config/prisma.js';

export async function findTokenByJti(jti) {
  return await prisma.token.findUnique({
    where: {
      jti: jti,
    },
  });
}

export async function blacklistToken(token,id) {
  const date = new Date(token.exp * 1000);
  return await prisma.jwtBlacklist.create({
    data: {
      jti: token.jti,
      userId: id,
      expiresIn: date,
    },
  });
}

export async function addTokenInfo(token, jti){
  return await prisma.managePostInfo.create({
    data:{
			token: token,
			uuid: jti
		}
  })
}

export async function validateTokenInfo(jti){
	return await prisma.managePostInfo.findFirst({
		where: {
			uuid: jti
		}
		
	})
}