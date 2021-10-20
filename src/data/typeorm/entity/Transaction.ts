import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { CommonProperties } from "./CommonProperties";
import { Category } from "./Category";

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
