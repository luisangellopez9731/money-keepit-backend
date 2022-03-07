import { Account, Category } from "modules";
import { TransactionType } from "../Transaction.entity";

export class CreateDto {
  description: string;
  date: Date;
  type: TransactionType;
  amount: number;
  account: Account["id"];
  category: Category["id"];
}
