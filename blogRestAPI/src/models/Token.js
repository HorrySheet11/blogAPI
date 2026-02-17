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