import { Transaction, Workspace } from "modules";
import { CommonProperties, getRepository } from "../common";
import {
  Connection,
  Entity,
  Column,
  AfterUpdate,
  OneToMany,
  AfterLoad,
  ManyToOne,
} from "typeorm";

@Entity()
export class Account extends CommonProperties {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column("double", { nullable: false, default: 0 })
  initialAmount: number;

  @Column("double", { default: 0.0 })
  amount: number;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @ManyToOne(() => Workspace, (workspace) => workspace.accounts)
  workspace: Workspace;
}

export const AccountRepository = (c: Connection) => getRepository(c, Account);
