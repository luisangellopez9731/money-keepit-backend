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

function router() {
  const router = Router();
  router.use("/workspaces", protectWithoutWorkspace, workSpace);
  router.use("/users", users);
  router.use("/auth/", auth);

  const commonOptions = {
    setRouterOnInit: true,
    middlewares: [protect],
  };

  new AutoCrud({
    app: router,
    path: "/accounts",
    repository: AccountRepository(),
    options: commonOptions,
  });

  new AutoCrud({
    app: router,
    path: "/categories",
    repository: CategoryRepository(),
    options: commonOptions,
  });

  new AutoCrud({
    app: router,
    path: "/transactions",
    repository: TransactionRepository(),
    options: commonOptions,
  });

  return router;
}

export default router;
