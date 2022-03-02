import { getConnection } from "typeorm";
import { createSchema, updateSchema } from "./joi.schema";
import { CreateDto, UpdateDto } from "./dtos";
import { AutoCrud } from "core/auto-rest-crud";
import { Account, AccountRepository } from "./Account.entity";

export class AccountController extends AutoCrud<Account, CreateDto, UpdateDto> {
  constructor(connectionName?: string) {
    super("/accounts", AccountRepository(getConnection(connectionName)), {
      validations: {
        post: createSchema,
        update: updateSchema,
      },
    });
  }
}
