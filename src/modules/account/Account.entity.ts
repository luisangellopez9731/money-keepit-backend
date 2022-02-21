import { Transaction } from "modules";
import { CommonProperties, getRepository } from "../common";
import { Connection, Entity, Column, ManyToOne, AfterUpdate } from "typeorm";

@Entity()
export class Account extends CommonProperties {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column("double")
  initialAmount: number;

  @Column("double", { default: 0.0 })
  amount: Number;

  @ManyToOne(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @AfterUpdate()
  updateAmountForTransactions() {
    this.amount =
      this.initialAmount +
      this.transactions.reduce((acc, { amount, type }) => {
        const mult = type == 1 ? -1 : 1;
        return acc + mult * amount;
      }, 0);
  }
}

export const AccountRepository = (c: Connection) => getRepository(c, Account);
