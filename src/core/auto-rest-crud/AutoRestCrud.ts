import { Repository } from "typeorm";
import { Router, Handler, Request, Response, NextFunction } from "express";
import { normalize } from "path";
import { validate, validateOrReject } from "class-validator";
import { ClassConstructor, plainToClass } from "class-transformer";

export type CustomHandler<T> = (
  req: Request,
  res: Response,
  repository: Repository<T>,
  next: NextFunction
) => void;

export interface Options {
  middlewares?: Handler[];
}

export default class AutoRestCrud<T> {
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
    return await (await this.repository).find({ where: { id } });
  }
  async create(data: T) {
    return await (await this.repository).save(data);
  }
  async update(id: string, data: T) {
    return await (await this.repository).update(id, data);
  }
  async delete(id: string) {
    return await (await this.repository).delete(id);
  }

  private async validateData(plain: any, cls: ClassConstructor<unknown>) {
    try {
      const object = plainToClass(cls, plain) as any;
      await validateOrReject(object);
    } catch (error) {
      throw error;
    }
  }

  router() {
    const pathId = normalize(this.path + "/:id").replace(/\\/g, "/");
    const router = Router();
    const middlewares = this.options.middlewares || [];

    router.get(this.path, ...middlewares, async (req, res, next) => {
      res.send(await this.getAll());
    });

    router.get(pathId, ...middlewares, async (req, res, next) => {
      const { id } = req.params;
      res.send(await this.get(id));
    });
    router.post(this.path, ...middlewares, async (req, res, next) => {
      try {
        const dto = {} as T;
        this.validateData(req.body, dto as any);
        res.send(await this.create(req.body));
      } catch (errors) {
        res.status(500).send(errors);
      }
    });

    router.put(pathId, ...middlewares, async (req, res, next) => {
      const { id } = req.params;
      res.send(await this.update(id, req.body));
    });

    router.delete(pathId, ...middlewares, async (req, res, next) => {
      const { id } = req.params;
      res.send(await this.delete(id));
    });

    return router;
  }
}
