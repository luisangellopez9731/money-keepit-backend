import { Transaction, TransactionType } from "modules";
import { Connection, Entity, Column, OneToMany } from "typeorm";
import { CommonProperties, getRepository } from "../common";

@Entity()
export class Category extends CommonProperties {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  icon: string;

  @Column()
  type: TransactionType;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];
}

export const CategoryRepository = (c: Connection) => getRepository(c, Category);
