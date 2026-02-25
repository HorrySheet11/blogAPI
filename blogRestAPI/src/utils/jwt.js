// src/utils/jwt.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRY = '7d';
const REFRESH_TOKEN_EXPIRY = '7d';

export function generateAccessToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      jti: uuidv4(),
    },
    JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
      algorithm: 'HS256',
    }
  );
}

export function generateRefreshToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      type: 'refresh',
      jti: uuidv4(),
    },
    JWT_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
      algorithm: 'HS256',
    }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function generateTokenPair(user) {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
    expiresIn: 900, 
    
  };
}