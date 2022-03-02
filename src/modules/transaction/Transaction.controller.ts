import { getConnection } from "typeorm";
import { AutoCrud } from "core/auto-rest-crud";
import { Transaction, TransactionRepository } from "./Transaction.entity";
import { CreateDto, UpdateDto } from "./dtos";
import { createSchema, updateSchema } from "./joi.schema";
import { AccountRepository } from "modules";

export class TransactionController extends AutoCrud<
  Transaction,
  CreateDto,
  UpdateDto
> {
  constructor() {
    super("/transactions", TransactionRepository(getConnection()), {
      validations: {
        post: createSchema,
        update: updateSchema,
      },
    });
  }

  async create(data: CreateDto): Promise<Transaction> {
    const accountRepository = await AccountRepository(getConnection());
    const account = await accountRepository.findOne(data.account);
    if (account == undefined) {
      throw new Error(`no account with id: ${data.account} found`);
    }
    const transaction = (await this.repository).create(data as any) as any;

    const response = await (await this.repository).save(transaction);
    account.amount = account.amount + data.amount * (data.type === 1 ? -1 : 1);
    await accountRepository.save(account);
    return response;
  }
}
