import UserModel, { User } from "../models/user.models";

export default class UserServices {
  static createUser(input: Partial<User>) {
    return UserModel.create(input);
  }
  static findUserById(id: string) {
    return UserModel.findById(id);
  }
  static findUserByEmail(email: string) {
    return UserModel.findOne({ email });
  }
}
