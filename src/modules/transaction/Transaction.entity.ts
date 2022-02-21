import { Account, Category } from "modules";
import { CommonProperties, getRepository } from "modules/common";
import {
  Column,
  Connection,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";

@Entity()
export class Transaction extends CommonProperties {
  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  type: 0 | 1;

  @Column("double")
  amount: number;

  @OneToMany(() => Account, (account) => account.transactions)
  account: Account;

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;
}

export const TransactionRepository = (c: Connection) =>
  getRepository(c, Transaction);
