import { UserRepository } from "@/data/typeorm/repositories";
import { InsertUser } from "@/data/typeorm/entity/User";
import { hash } from "bcrypt";

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
    user.password = await hash(user.password, 10);
    return UserRepository().save(user);
  };
}
