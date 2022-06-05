import { CreateDto, UpdateDto } from "./dtos";
import { createSchema, updateSchema } from "./joi.schema";
import { Account, AccountRepository } from "./Account.entity";
import { AutoRestCrudTenant } from "core/auto-rest-crud/AutoRestCrudTenant";

export class AccountController extends AutoRestCrudTenant<
  Account,
  CreateDto,
  UpdateDto
> {
  constructor() {
    super("/accounts", AccountRepository, {
      validations: {
        post: createSchema,
        update: updateSchema,
      },
    });
  }
}
