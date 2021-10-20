import { Router } from "express";
import {
  AccountRepository,
  CategoryRepository,
  TransactionRepository,
} from "data/typeorm/repositories";
import { AutoCrud } from "core/auto-rest-crud";
import connection from "connection";

async function router() {
  const router = Router();

  const commonOptions = {
    setRouterOnInit: true,
  };

  const conn = await connection();

  new AutoCrud({
    app: router,
    path: "/accounts",
    repository: AccountRepository(conn),
    options: commonOptions,
  });

  new AutoCrud({
    app: router,
    path: "/categories",
    repository: CategoryRepository(conn),
    options: commonOptions,
  });

  new AutoCrud({
    app: router,
    path: "/transactions",
    repository: TransactionRepository(conn),
    options: commonOptions,
  });

  return router;
}

export default router;
