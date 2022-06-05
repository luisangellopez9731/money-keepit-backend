import { getConnection } from "typeorm";
import { Transaction, TransactionRepository } from "./Transaction.entity";
import { CreateDto, UpdateDto } from "./dtos";
import { createSchema, updateSchema } from "./joi.schema";
import { AccountRepository, CategoryRepository } from "modules";
import { Response, Request, NextFunction } from "express";
import { AutoRestCrudTenant } from "core/auto-rest-crud/AutoRestCrudTenant";

export class TransactionController extends AutoRestCrudTenant<
  Transaction,
  CreateDto,
  UpdateDto
> {
  constructor() {
    super("/transactions", TransactionRepository, {
      validations: {
        post: createSchema,
        update: updateSchema,
      },
    });
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    this.updateRepository(req);
    const data = req.body as unknown as CreateDto;
    const accountRepository = await AccountRepository(
      getConnection(this.connectionName)
    );
    const account = await accountRepository.findOne(data.account);
    if (account == undefined) {
      throw new Error(`no account with id: ${data.account} found`);
    }
    const categoryRepository = await CategoryRepository(
      getConnection(this.connectionName)
    );
    const category = await categoryRepository.findOne(data.category);
    if (category == undefined) {
      throw new Error(`no category with id: ${data.account} found`);
    }
    const transaction = (await this.repository).create(data as any) as any;

    const response = await (await this.repository).save(transaction);
    account.amount = account.amount + data.amount * (data.type === 1 ? -1 : 1);
    await accountRepository.save(account);
    res.send(response);
  };
}
