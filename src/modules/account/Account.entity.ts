import { Connection, Entity, Column } from "typeorm";
import { CommonProperties, getRepository } from "../common";

@Entity()
export class Account extends CommonProperties {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column("double")
  initialAmount: number;
}

export const AccountRepository = (c: Connection) => getRepository(c, Account);
