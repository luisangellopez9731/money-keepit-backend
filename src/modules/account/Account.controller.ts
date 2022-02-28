import { getConnection } from "typeorm";
import { createSchema } from "./joi.schema";
import { AutoCrud } from "core/auto-rest-crud";
import { Account, AccountRepository } from "./Account.entity";

export class AccountController extends AutoCrud<Account> {
  constructor(connectionName?: string) {
    super("/accounts", AccountRepository(getConnection(connectionName)), {
      validations: {
        post: createSchema,
      },
    });
  }
}
