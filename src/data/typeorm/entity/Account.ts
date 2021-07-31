import { Entity, Column } from "typeorm";
import { LoggedEntity } from "./CommonProperties";
@Entity()
export class Account extends LoggedEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column("double")
  initialAmount: number;
}
