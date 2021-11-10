import { Category } from "modules/category";
import { CommonProperties, getRepository } from "modules/common";
import { Entity, Column, OneToOne, JoinColumn, Connection } from "typeorm";

@Entity()
export class Transaction extends CommonProperties {
  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  type: "income" | "expense";

  @Column("double")
  amount: number;

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;
}

export const TransactionRepository = (c: Connection) =>
  getRepository(c, Transaction);
