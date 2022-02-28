import { Transaction } from "modules";
import { CommonProperties, getRepository } from "../common";
import { Connection, Entity, Column, AfterUpdate, OneToMany } from "typeorm";

@Entity()
export class Account extends CommonProperties {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column("double", { nullable: false, default: 0 })
  initialAmount: number;

  @Column("double", { default: 0.0 })
  amount: Number;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @AfterUpdate()
  updateAmountFromTransactions() {
    this.amount =
      this.initialAmount +
      this.transactions.reduce((acc, { amount, type }) => {
        const mult = type == 1 ? -1 : 1;
        return acc + mult * amount;
      }, 0);
  }
}

export const AccountRepository = (c: Connection) => getRepository(c, Account);
