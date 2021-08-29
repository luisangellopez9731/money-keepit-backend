import { Router } from "express";
import workSpace from "./workspace";
import users from "./users";
import auth from "./auth";
import { protect, protectWithoutWorkspace } from "middlewares/auth";
import { AutoCrud } from "core/auto-rest-crud";
import { AccountRepository } from "data/typeorm/repositories";

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

  return router;
}

export default router;
