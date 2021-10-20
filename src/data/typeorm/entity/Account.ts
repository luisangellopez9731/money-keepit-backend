import { Entity, Column } from "typeorm";
import { CommonProperties } from "./CommonProperties";
@Entity()
export class Account extends CommonProperties {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column("double")
  initialAmount: number;
}
