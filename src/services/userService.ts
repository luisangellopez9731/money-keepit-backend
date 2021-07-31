import { UserRepository } from "../data/typeorm/repositories";

export class UserService {
  static getAll = async () => {
    return UserRepository().find();
  };
}
