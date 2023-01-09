import { validateUsername, validatePw } from "../utils/validate";
import { raiseCustomError } from "../utils/error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../models";
const User = db.users;

const secretKey: any = process.env.JWT_SECRET_KEY;

export const signUp = async (username: string, password: string) => {
  validateUsername(username);
  validatePw(password);

  const hashedPassword = await bcrypt.hash(password, 12);
  const createUser = await User.create({
    password: hashedPassword,
    username: username,
  });

  return createUser;
};

export const signIn = async (username: string, password: string) => {
  validateUsername(username);
  validatePw(password);

  const user = await User.findOne({
    where: { username: username },
  });

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    raiseCustomError("INVALID_USER", 401);
  }

  const payLoad = { userId: user.id };
  const accessToken = jwt.sign(payLoad, secretKey);
  return accessToken;
};
