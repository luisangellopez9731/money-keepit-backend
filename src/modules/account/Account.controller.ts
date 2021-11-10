import { getConnection } from "typeorm";
import { AutoCrud } from "core/auto-rest-crud";
import { Account, AccountRepository } from "./Account.entity";

export class AccountController extends AutoCrud<Account> {
  constructor() {
    super("/accounts", AccountRepository(getConnection()));
  }
}
