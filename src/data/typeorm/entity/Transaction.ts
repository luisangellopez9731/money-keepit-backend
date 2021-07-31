import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { LoggedEntity } from "./CommonProperties";
import { Category } from "./Category";

@Entity()
export class Transaction extends LoggedEntity {
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
