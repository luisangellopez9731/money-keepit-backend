import { WorkspaceRepository } from "../data/typeorm/repositories";
import { InsertWorkspace } from "../data/typeorm/entity/Workspace";

export class WorkspaceService {
  static create = async (workspace: InsertWorkspace) => {
    return await WorkspaceRepository().save(workspace);
  };
}
