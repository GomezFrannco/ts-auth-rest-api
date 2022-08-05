import { Request, Response } from "express";
import { get } from "lodash";
import AuthServices from "../services/auth.services";
import UserServices from "../services/user.services";
import { CreateSessionInput } from "../types/api.types";
import { verifyJwt } from "../utils/jwt.utils";

export default class PostAuthHandlers {
  static async createSessionHandler (req: Request<{}, {}, CreateSessionInput>, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await UserServices.findUserByEmail(email);
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
      const accessToken = AuthServices.signAccessToken(user);
      const refreshToken = await AuthServices.signRefreshToken({ userId: user._id });
      return res.send({
        accessToken,
        refreshToken,
      });
    } catch (e) {
      res.status(500).send(e);
    }
  }
  static async refreshAccessTokenHandler(req: Request, res: Response) {
    try {
      const refreshToken = get(req, 'header.x-refresh');
      const decoded = verifyJwt<{ session: string }>(refreshToken, 'refreshTokenPublicKey')
      if(!decoded) {
        res.status(401).send("Could not refresh token")
      } else {
        const session = await AuthServices.findSessionById(decoded.session);
        if(!session || !session.valid) {
          res.status(401).send("Could not refresh token")
        }
        if(session) {
          const user = await UserServices.findUserById(String(session.user));
          if(!user) {
            res.status(401).send("Could not refresh token")
          }
          if (user) {
            const accessToken = AuthServices.signAccessToken(user);
            res.send({ accessToken });
          }
        }
      }
    } catch (e) {
      res.status(500).send(e)
    }
  }
}