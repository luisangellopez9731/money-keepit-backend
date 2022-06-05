import { Router } from "express";
import {
  AccountController,
  CategoryController,
  TransactionController,
  WorkSpaceController,
} from "./modules";

function router() {
  const router = Router();
  
  router.use(new AccountController().router());
  router.use(new CategoryController().router());
  router.use(new TransactionController().router());
  router.use(new WorkSpaceController().router());

  return router;
}

export default router;
