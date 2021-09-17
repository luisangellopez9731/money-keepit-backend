import { User } from "data/typeorm/entity";
import { WorkspaceRepository, UserRepository } from "data/typeorm/repositories";
import { InsertWorkspace, Workspace } from "../data/typeorm/entity/Workspace";

export class WorkspaceService {
  static getAll = async (id: string) => {
    const user = await UserRepository().findOne({
      where: { id },
      relations: ["workspaces"],
    });

    if (!user) {
      throw {
        status: 404,
        message: `usuario con id: ${id} no existe`,
      };
    }

    console.log(user);
    return user.workspaces || [];
  };
  static create = async (workspace: InsertWorkspace) => {
    const user = await UserRepository().findOne({
      where: { id: workspace.userId },
    });

    const workspace1 = new Workspace();
    workspace1.name = workspace.name;
    workspace1.description = workspace.description || "";
    workspace1.users = [user as User];
    return await WorkspaceRepository().save(workspace1);
  };
}
