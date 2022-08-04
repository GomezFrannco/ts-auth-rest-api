import { Request, Response } from "express";
import { get } from "lodash";
import { findSessionById, signAccessToken, signRefreshToken } from "../services/auth.services";
import { findUserByEmail, findUserById } from "../services/user.services";
import { CreateSessionInput } from "../types/api.types";
import { verifyJwt } from "../utils/jwt.utils";

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

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = get(req, 'header.x-refresh');
  const decoded = verifyJwt<{ session: string }>(refreshToken, 'refreshTokenPublicKey')
  if(!decoded) {
    res.status(401).send("Could not refresh token")
  } else {
    const session = await findSessionById(decoded.session);
    if(!session || !session.valid) {
      res.status(401).send("Could not refresh token")
    }
    if(session) {
      const user = await findUserById(String(session.user));
      if(!user) {
        res.status(401).send("Could not refresh token")
      }
      if (user) {
        const accessToken = signAccessToken(user);
        res.send({ accessToken });
      }
    }
  }
}
