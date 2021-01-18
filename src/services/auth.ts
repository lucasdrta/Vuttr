import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { IUser } from '../models/user';

export interface DecodedUser extends Omit<IUser, '_id'> {
  id: string;
}

export default class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(payload: Record<string, unknown>): string {
    return jwt.sign(payload, 'secret-key', {
      expiresIn: 20000000,
    });
  }

  public static decodeToken(token: string): DecodedUser {
    return jwt.verify(token, 'secret-key') as DecodedUser;
  }
}
