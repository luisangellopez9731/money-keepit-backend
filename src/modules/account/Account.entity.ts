import { Transaction } from "modules";
import { CommonProperties, getRepository } from "../common";
import { Connection, Entity, Column, OneToMany } from "typeorm";

@Entity()
export class Account extends CommonProperties {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column("double precision", { default: 0.0 })
  amount: number;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}

export const AccountRepository = (c: Connection) => getRepository(c, Account);
