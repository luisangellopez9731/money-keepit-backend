import { getConnection } from "typeorm";
import { createSchema, updateSchema } from "./joi.schema";
import { CreateDto, UpdateDto } from "./dtos";
import { AutoCrud } from "core/auto-rest-crud";
import { Workspace, WorkSpaceRepository } from "./Workspace.entity";

export class WorkSpaceController extends AutoCrud<
  Workspace,
  CreateDto,
  UpdateDto
> {
  constructor(connectionName?: string) {
    super("/workspaces", WorkSpaceRepository(getConnection(connectionName)), {
      validations: {
        post: createSchema,
        update: updateSchema,
      },
    });
  }
}
