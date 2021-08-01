import { Entity, Column, ManyToMany } from "typeorm";
import { IUser } from "./User";
import { CommonProperties } from "./CommonProperties";

export interface InsertWorkspace {
  name: string;
  description?: string
  userId: string;
}

export interface IWorkspace extends CommonProperties {
  name: string;
  description?: string;
}
@Entity()
export class Workspace extends CommonProperties implements IWorkspace {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany("Workspace", "User")
  users: IUser[];
}
