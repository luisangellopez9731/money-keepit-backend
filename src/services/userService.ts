import { UserRepository } from "../data/typeorm/repositories";
import { InsertUser } from "../data/typeorm/entity/User";

export class UserService {
  static getAll = async () => {
    return await UserRepository().find();
  };
  
  static get = async (id: string) => {
    const user = await UserRepository().findOne(id);
    delete user.password;
    return user;
  };

  static create = async (user: InsertUser) => {
    return UserRepository().save(user);
  };
}
