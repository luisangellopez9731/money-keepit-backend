import { InsertUser } from "data/typeorm/entity/User";
import { UserRepository } from "data/typeorm/repositories";
import { compare, generateToken, verifyToken } from "utils";
import { UserService } from "services/user";
import conn from "connection";

function error(status: number, message: string) {
  return {
    status,
    message,
  };
}
export class AuthService {
  static doLogin = async (userData: InsertUser) => {
    const user = await UserRepository(await conn()).findOne({
      where: {
        username: userData.username,
      },
    });

    if (!user) return error(404, "no existe un usuario con este email");

    const correctPassword = await compare(userData.password, user.password);
    if (!correctPassword) return error(400, "contraseña incorrecta");
    const { id } = user;
    const dataToTokenize = { id };
    const token = await generateToken(dataToTokenize);

    return token;
  };

  static doLoginWithWorkspace = async (id: string, workspaceId: string) => {
    const user = await UserService.get({ id });

    if (!user) return error(404, `usuario con id ${id} no existe`);

    const getWorkspace = (id: string) => {
      return user.workspaces?.filter((ws: any) => ws.id === id);
    };
    const workspace = getWorkspace(workspaceId);

    const token = await generateToken({ id, workspace });

    return token;
  };

  static checkLogin = async (token: string) => {
    const decoded = await verifyToken(token);
    if (decoded) {
      return generateToken(decoded);
    } else {
      return false;
    }
  };
}
