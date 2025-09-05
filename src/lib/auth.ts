import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export type JwtPayload = {
  userId: number;
  tokenVersion: number;
};

export function signAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(payload: JwtPayload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload;
}
