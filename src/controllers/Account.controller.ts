import { Router } from "express";
import {
  AccountRepository,
  CategoryRepository,
  TransactionRepository,
} from "data/typeorm/repositories";
import connection from "connection";
import { AutoCrud } from "core/auto-rest-crud";
import { Account } from "data/typeorm/entity";

export default class AccountController extends AutoCrud<Account> {
  constructor() {
    super("/accounts", AccountRepository(connection()));
  }
}
