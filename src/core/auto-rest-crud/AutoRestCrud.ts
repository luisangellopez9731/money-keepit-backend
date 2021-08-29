import { Repository } from "typeorm";
import {
  Express,
  Router,
  Handler,
  IRouter,
  Request,
  Response,
  NextFunction,
} from "express";
import { normalize } from "path";

export interface AutoCrudParams<T> {
  repository: Repository<T>;
  app: Express | IRouter;
  path: string;
  options?: Options<T>;
}

export type CustomHandler<T> = (
  req: Request,
  res: Response,
  repository: Repository<T>,
  next: NextFunction
) => void;

export interface Options<T> {
  setRouterOnInit?: boolean;
  middlewares?: Handler[];
  getAll?: CustomHandler<T>;
  get?: CustomHandler<T>;
  post?: CustomHandler<T>;
  put?: CustomHandler<T>;
  delete?: CustomHandler<T>;
}

export default class AutoRestCrud<T> {
  repository: Repository<T>;
  app: Express | IRouter;
  path: string;
  options: Options<T>;
  constructor({ app, path, repository, options }: AutoCrudParams<T>) {
    this.repository = repository;
    this.app = app;
    this.path = normalize(path);
    this.options = options || {};

    if (this.options.setRouterOnInit) {
      this.setRouter();
    }
  }
  async getAll() {
    return await this.repository.find();
  }
  async get(id: string) {
    return await this.repository.find({ where: { id } });
  }
  async create(data: T) {
    return await this.repository.create(data);
  }
  async update(id: string, data: T) {
    return await this.repository.update(id, data);
  }
  async delete(id: string) {
    return await this.repository.delete(id);
  }

  router() {
    const pathId = normalize(this.path + "/:id");
    const router = Router();
    const middlewares = this.options.middlewares || [];
    const { getAll, get, post, put, delete: deleteHandler } = this.options;

    router.get(this.path, ...middlewares, async (req, res, next) => {
      if (getAll) {
        getAll(req, res, this.repository, next);
      } else {
        res.send(await this.getAll());
      }
    });

    router.get(pathId, ...middlewares, async (req, res, next) => {
      if (get) {
        get(req, res, this.repository, next);
      } else {
        const { id } = req.params;
        res.send(await this.get(id));
      }
    });
    router.post(this.path, ...middlewares, async (req, res, next) => {
      if (post) {
        post(req, res, this.repository, next);
      } else {
        res.send(await this.create(req.body));
      }
    });

    router.put(pathId, ...middlewares, async (req, res, next) => {
      if (put) {
        put(req, res, this.repository, next);
      } else {
        const { id } = req.params;
        res.send(await this.update(id, req.body));
      }
    });

    router.delete(pathId, ...middlewares, async (req, res, next) => {
      if (deleteHandler) {
        deleteHandler(req, res, this.repository, next);
      } else {
        const { id } = req.params;
        res.send(await this.delete(id));
      }
    });

    return router;
  }

  setRouter() {
    this.app.use(this.router());
  }
}
