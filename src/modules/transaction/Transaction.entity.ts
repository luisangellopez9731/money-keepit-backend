import { Account, Category, Workspace } from "modules";
import { CommonProperties, getRepository } from "modules/common";
import { Column, Connection, Entity, JoinColumn, ManyToOne } from "typeorm";

export enum TransactionType {
  income,
  expense,
}

@Entity()
export class Transaction extends CommonProperties {
  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  type: TransactionType;

  @Column("double")
  amount: number;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => Workspace, (workspace) => workspace.transactions)
  workspace: Workspace;
}

export const TransactionRepository = (c: Connection) =>
  getRepository(c, Transaction);
