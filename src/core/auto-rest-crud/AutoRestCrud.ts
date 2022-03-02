import { normalize } from "path";
import { ObjectSchema } from "joi";
import { Repository } from "typeorm";
import { Router, Handler, Request, Response, NextFunction } from "express";
export type CustomHandler<T> = (
  req: Request,
  res: Response,
  repository: Repository<T>,
  next: NextFunction
) => void;

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
  async getAll() {
    return await (await this.repository).find();
  }
  async get(id: string) {
    return await (await this.repository).findOne({ where: { id } });
  }
  async create(data: DtoCreate) {
    const obj = (await this.repository).create({ ...data });
    return await (await this.repository).save(obj);
  }
  async update(id: string, data: DtoUpdate) {
    const obj = await this.get(id);
    console.log(obj);
    if (obj === undefined) {
      throw new Error(`obj with id: ${id} doesn't exist`);
    }
    const result = await (
      await this.repository
    ).update(id, { ...obj, ...data, updatedDate: new Date() });
    return await this.get(id);
  }
  async delete(id: string) {
    return await (await this.repository).delete(id);
  }

  public async validateData(plain: any, objectSchema: ObjectSchema) {
    try {
      await objectSchema.validateAsync(plain);
    } catch (error) {
      throw error;
    }
  }

  router() {
    const pathId = normalize(this.path + "/:id").replace(/\\/g, "/");
    const router = Router();
    const middlewares = this.options.middlewares || [];

    router.get(this.path, ...middlewares, async (req, res, next) => {
      console.log(await this.getAll());
      res.send(await this.getAll());
    });

    router.get(pathId, ...middlewares, async (req, res, next) => {
      const { id } = req.params;
      res.send(await this.get(id));
    });
    router.post(this.path, ...middlewares, async (req, res, next) => {
      try {
        if (this.options.validations?.post)
          await this.validateData(
            req.body as DtoCreate,
            this.options.validations.post
          );

        res.send(await this.create(req.body));
      } catch (errors) {
        console.log(errors);
        res.status(500).send({ errors });
      }
    });

    router.patch(pathId, ...middlewares, async (req, res, next) => {
      try {
        const { id } = req.params;
        if (this.options.validations?.update)
          await this.validateData(
            req.body as DtoUpdate,
            this.options.validations.update
          );
        res.send(await this.update(id, req.body as DtoUpdate));
      } catch (errors) {
        res.status(500).send({ errors });
      }
    });

    router.delete(pathId, ...middlewares, async (req, res, next) => {
      const { id } = req.params;
      res.send(await this.delete(id));
    });

    return router;
  }
}
