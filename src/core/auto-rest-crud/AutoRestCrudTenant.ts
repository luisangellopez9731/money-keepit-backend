import { getTenantConnection } from "connection";
import { Connection, Repository } from "typeorm";
import AutoRestCrud, { Options } from "./AutoRestCrud";
import { Request, Response, NextFunction } from "express";

export class AutoRestCrudTenant<T, DtoCreate, DtoUpdate> extends AutoRestCrud<
  T,
  DtoCreate,
  DtoUpdate
> {
  repositoryFunction: (c: Connection) => Promise<Repository<T>>;
  public connectionName: string;
  public tenantId: string
  constructor(
    path: string,
    repositoryFunction: (c: Connection) => Promise<Repository<T>>,
    options?: Options
  ) {
    super(`/:tenantId${path}`, null, options);
    this.repositoryFunction = repositoryFunction;
  }

  async updateRepository(req: Request) {
    const { tenantId } = req.params;
    this.connectionName = `tenant_${tenantId}`;
    this.tenantId = tenantId
    const connection = await getTenantConnection(tenantId);
    this.repository = this.repositoryFunction(connection);
  }
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.updateRepository(req);
      res.send(await this.getAllService());
    } catch (errors) {
      res.status(500).send((<Error>errors).message);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.updateRepository(req);
      const { id } = req.params;
      res.send(await this.getService(id));
    } catch (errors) {
      res.status(500).send((<Error>errors).message);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    await this.updateRepository(req);
    const data = { ...req.body, workspace: this.tenantId } as DtoCreate
    try {
      if (this.options.validations?.post)
        await this.validateData(
          data,
          this.options.validations.post
        );

      res.send(await this.createService(data));
    } catch (errors) {
      res.status(500).send({ error: (<Error>errors).message });
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    await this.updateRepository(req);
    const data = { ...req.body, workspace: this.tenantId } as DtoUpdate
    try {
      const { id } = req.params;
      if (this.options.validations?.update)
        await this.validateData(
          data,
          this.options.validations.update
        );
      res.send(await this.updateService(id, data));
    } catch (errors) {
      res.status(500).send((<Error>errors).message);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await this.updateRepository(req);
    try {
      const { id } = req.params;
      res.send(await this.deleteService(id));
    } catch (errors) {
      res.status(500).send((<Error>errors).message);
    }
  };
}
