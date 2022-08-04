import { Request, Response } from "express";
import { signAccessToken, signRefreshToken } from "../services/auth.services";
import { findUserByEmail } from "../services/user.services";
import { CreateSessionInput } from "../types/api.types";

export async function createSessionHandler(req: Request<{}, {}, CreateSessionInput>, res: Response) {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if(!user) {
    return res.status(404).send("Invalid email or password");
  }
  if(!user.verified) {
    return res.status(401).send("Please verify your email");
  }
  const isValid = await user.validatePassword(password);
  if(!isValid) {
    return res.status(401).send("Invalid email or password")
  }
  const accessToken = signAccessToken(user);
  const refreshToken = await signRefreshToken({ userId: user._id });
  return res.send({
    accessToken,
    refreshToken,
  })
}
