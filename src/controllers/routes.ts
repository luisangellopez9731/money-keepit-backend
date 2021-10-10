import auth from "./auth";
import users from "./users";
import { Router } from "express";
import {
  AccountRepository,
  CategoryRepository,
  TransactionRepository,
} from "data/typeorm/repositories";
import workSpace from "./workspace";
import { AutoCrud } from "core/auto-rest-crud";
import { protect, protectWithoutWorkspace } from "middlewares/auth";
import connection from "connection";

async function router() {
  const router = Router();
  router.use("/workspaces", protectWithoutWorkspace, workSpace);
  router.use("/users", users);
  router.use("/auth/", auth);

  const commonOptions = {
    setRouterOnInit: true,
    middlewares: [protect],
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
