import { getConnection } from "typeorm";
import { AutoCrud } from "core/auto-rest-crud";
import { Transaction, TransactionRepository } from "./Transation.entity";

export class TransactionController extends AutoCrud<Transaction> {
  constructor() {
    super("/transactions", TransactionRepository(getConnection()));
  }
}