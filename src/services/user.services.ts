import UserModel, { User } from "../models/user.models";

export function createUser(input: Partial<User>) {
  return UserModel.create(input);
};
