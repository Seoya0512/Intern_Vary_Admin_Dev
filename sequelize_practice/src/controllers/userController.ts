import { Request, Response } from "express";
import { catchAsync, raiseCustomError } from "../utils/error";
import * as userService from "../services/userService";

export const signUp = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    raiseCustomError("KEY_ERROR", 400);
  }

  await userService.signUp(username, password);

  return res.status(201).json({
    message: "SIGNUP_SUCCESS",
  });
});

export const singIn = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    raiseCustomError("KEY_ERROR", 400);
  }

  const accessToken = await userService.signIn(username, password);

  return res.status(201).json({
    accessToken,
  });
});
