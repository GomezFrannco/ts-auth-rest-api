import { DocumentType } from "@typegoose/typegoose";
import { omit } from "lodash";
import SessionModel from "../models/session.models";
import { privateFields, User } from "../models/user.models";
import { signJwt } from "../utils/jwt.utils";

export function createSession({ userId }: { userId: string }) {
  return SessionModel.create({ user: userId });
}
export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({
    userId,
  });
  const refreshToken = signJwt(
    {
      session: session._id,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: '1y',
    }
  );
  return refreshToken;
}
export function signAccessToken(user: DocumentType<User>) {
  const payload = omit(user.toJSON(), privateFields);
  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: '15m',
  });
  return accessToken;
}

export function findSessionById(id: string) {
  return SessionModel.findById(id);
}
