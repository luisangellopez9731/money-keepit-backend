import { Connection, Entity, Column } from "typeorm";
import { CommonProperties, getRepository } from "../common";

@Entity()
export class Category extends CommonProperties {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  icon: string;
}

export const CategoryRepository = (c: Connection) => getRepository(c, Category);
