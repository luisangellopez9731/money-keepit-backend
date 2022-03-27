import { Transaction } from "modules";

export class AccountModel {
  name: string;

  description: string;

  initialAmount: number;

  amount: Number;
  transactions: Transaction[];
}
