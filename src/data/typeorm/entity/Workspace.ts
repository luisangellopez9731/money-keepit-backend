import { IUser, User } from "./User";
import { CommonProperties } from "./CommonProperties";
import { Entity, Column, ManyToMany, JoinTable } from "typeorm";

export interface InsertWorkspace {
  name: string;
  description?: string;
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

  @Column({ default: "" })
  description: string;

  @ManyToMany(() => User, (user) => user.workspaces)
  @JoinTable()
  users: IUser[];
}
