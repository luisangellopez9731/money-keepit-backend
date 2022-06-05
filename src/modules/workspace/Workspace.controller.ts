import { getConnection, getManager } from "typeorm";
import { createSchema, updateSchema } from "./joi.schema";
import { CreateDto, UpdateDto } from "./dtos";
import { AutoCrud } from "core/auto-rest-crud";
import { Workspace, WorkSpaceRepository } from "./Workspace.entity";
import { NextFunction, Request, Response } from "express";

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

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createSchema.validateAsync(req.body as CreateDto);
      const { name } = req.body;
      await getManager().query(`CREATE SCHEMA ${name}_workspace;`);
      res.send({ name });
    } catch (err) {
      res.status(500).send((<Error>err).message);
    }
  };
}
