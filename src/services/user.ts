import { UserRepository } from "data/typeorm/repositories";
import { InsertUser } from "data/typeorm/entity/User";
import { hash } from "bcrypt";
import connection from "connection";

export class UserService {
  static getAll = async () => {
    return await UserRepository(await connection()).find();
  };

  static get = async (criteria: any) => {
    const user = await UserRepository(await connection()).findOne({
      where: criteria,
    });
    delete (user as { id: string; username: string; password?: string })
      .password;
    return user;
  };

  static create = async (user: InsertUser) => {
    user.password = await hash(user.password, 10);
    const userCreated = await UserRepository(await connection()).save(user);
    return { username: userCreated.username };
  };
}
