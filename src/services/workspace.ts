import { WorkspaceRepository, UserRepository } from "data/typeorm/repositories";
import { InsertWorkspace } from "../data/typeorm/entity/Workspace";

export class WorkspaceService {
  static getAll = async (username: string) => {
    const user = await UserRepository().findOne({ where: { username } });

    if (!user) {
      throw {
        status: 404,
        message: `usuario con username: ${username} no existe`,
      };
    }
    console.log({user})
    return user.workspaces || [];
  };
  static create = async (workspace: InsertWorkspace) => {
    return await WorkspaceRepository().save(workspace);
  };
}
