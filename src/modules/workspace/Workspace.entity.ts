import { Account, Category, Transaction } from "modules";
import { CommonProperties, getRepository } from "../common";
import { Connection, Entity, Column, OneToMany } from "typeorm";

@Entity()
export class Workspace extends CommonProperties {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;

  // @OneToMany(() => Account, (account) => account.workspace)
  // accounts: Account[];

  // @OneToMany(() => Transaction, (transaction) => transaction.workspace)
  // transactions: Transaction[];

  // @OneToMany(() => Category, (category) => category.workspace)
  // categories: Category[];
}

export const WorkSpaceRepository = (c: Connection) =>
  getRepository(c, Workspace);
