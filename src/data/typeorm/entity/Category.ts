import { Entity, Column } from "typeorm";
import { CommonProperties } from "./CommonProperties";
@Entity()
export class Category extends CommonProperties {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  icon: string;
}
