import { Entity, Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { IWorkspace } from "./Workspace";
import { CommonProperties } from "./CommonProperties";

export interface IUser extends CommonProperties {
  username: string;
  password: string;
}
@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @ManyToMany("Workspace", "User")
  workspaces?: IWorkspace[];
}
