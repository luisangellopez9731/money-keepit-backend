import { Entity, Column } from "typeorm";
import { LoggedEntity } from "./CommonProperties";
@Entity()
export class Category extends LoggedEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  icon: string;
}
