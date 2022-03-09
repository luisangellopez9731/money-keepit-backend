import { normalize } from "path";
import { ObjectSchema } from "joi";
import { Repository } from "typeorm";
import { Router, Handler, Request, Response, NextFunction } from "express";

export interface Options {
  middlewares?: Handler[];
  validations?: {
    post?: ObjectSchema;
    update?: ObjectSchema;
  };
}

export default class AutoRestCrud<T, DtoCreate, DtoUpdate> {
  repository: Promise<Repository<T>>;
  path: string;
  options: Options;
  router_ = Router();
  constructor(
    path: string,
    repository: Promise<Repository<T>>,
    options?: Options
  ) {
    this.repository = repository;
    this.path = normalize(path).replace(/\\/g, "/");
    this.options = options || {};
  }
  async getAllService() {
    return await (await this.repository).find();
  }
  async getService(id: string) {
    return await (await this.repository).findOne({ where: { id } });
  }
  async createService(data: DtoCreate) {
    const obj = (await this.repository).create({ ...data });
    return await (await this.repository).save(obj);
  }
  async updateService(id: string, data: DtoUpdate) {
    const obj = await this.getService(id);
    console.log(obj);
    if (obj === undefined) {
      throw new Error(`obj with id: ${id} doesn't exist`);
    }
    await (
      await this.repository
    ).update(id, { ...obj, ...data, updatedDate: new Date() });
    return await this.getService(id);
  }
  async deleteService(id: string) {
    return await (await this.repository).delete(id);
  }

  public async validateData(plain: any, objectSchema: ObjectSchema) {
    try {
      await objectSchema.validateAsync(plain);
    } catch (error) {
      throw error;
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    console.log(await this.getAllService());
    res.send(await this.getAllService());
  }

  async get(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    res.send(await this.getService(id));
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (this.options.validations?.post)
        await this.validateData(
          req.body as DtoCreate,
          this.options.validations.post
        );

      res.send(await this.createService(req.body));
    } catch (errors) {
      res.status(500).send((<Error>errors).message);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (this.options.validations?.update)
        await this.validateData(
          req.body as DtoUpdate,
          this.options.validations.update
        );
      res.send(await this.updateService(id, req.body as DtoUpdate));
    } catch (errors) {
      res.status(500).send((<Error>errors).message);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    res.send(await this.deleteService(id));
  }

  router() {
    const pathId = normalize(this.path + "/:id").replace(/\\/g, "/");
    const router = Router();
    const middlewares = this.options.middlewares || [];

    router.get(this.path, ...middlewares, this.getAll);
    router.get(pathId, ...middlewares, this.get);
    router.post(this.path, ...middlewares, this.create);
    router.patch(pathId, ...middlewares, this.update);
    router.delete(pathId, ...middlewares, this.delete);

    return router;
  }
}
