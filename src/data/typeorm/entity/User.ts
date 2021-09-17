import {
  Entity,
  Column,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { IWorkspace, Workspace } from "./Workspace";
import { CommonProperties } from "./CommonProperties";

export interface InsertUser {
  username: string;
  password: string;
}

export interface LoggingUser extends InsertUser {
  workspaceId: string;
}

export interface LoggedUser {
  username: string;
  workspace: IWorkspace;
}

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

  @ManyToMany(() => Workspace, workspace => workspace.users)
  workspaces?: IWorkspace[];
}
