import { raiseCustomError } from "./error";

export const validateUsername = (username: string) => {
  const UsernameRegex = /^[a-z0-9_-]{3,16}$/;

  if (!UsernameRegex.test(username)) {
    raiseCustomError("INVALID_USERNAME", 401);
  }
};

export const validatePw = (password: string) => {
  const passwordRegex = /^[A-Za-z0-9]{6,12}$/;

  if (!passwordRegex.test(password)) {
    raiseCustomError("INVALID_PASSWORD", 401);
  }
};
