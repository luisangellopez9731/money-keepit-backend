import { Router } from "express";
import {
  AccountRepository,
  CategoryRepository,
  TransactionRepository,
} from "data/typeorm/repositories";
import connection from "connection";
import { AutoCrud } from "core/auto-rest-crud";
import AccountController from "./Account.controller";

async function router() {
  const router = Router();

  const conn = await connection();

  // new AutoCrud({
  //   path: "/accounts",
  //   repository: AccountRepository(conn),
  // });

  // new AutoCrud({
  //   path: "/categories",
  //   repository: CategoryRepository(conn),
  // });

  // new AutoCrud({
  //   path: "/transactions",
  //   repository: TransactionRepository(conn),
  // });

  router.use(new AccountController().router());

  return router;
}

export default router;
