import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../interfaces/user";

dotenv.config({ path: __dirname + "./../../.env.local" });

export function verifyAccessToken(token: string): User | Error {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN as Secret);
    return decoded as User;
  } catch (error: any) {
    return error.message as Error;
  }
}

export function verifyRefreshToken(token: string): User | Error {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN as Secret);
    return decoded as User;
  } catch (error: any) {
    return error.message as Error;
  }
}
