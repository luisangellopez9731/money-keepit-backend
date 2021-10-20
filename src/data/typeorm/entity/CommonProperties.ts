import { PrimaryGeneratedColumn } from "typeorm";

export class CommonProperties {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}
