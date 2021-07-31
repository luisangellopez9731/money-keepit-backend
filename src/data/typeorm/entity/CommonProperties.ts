import { PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { IWorkspace } from "./Workspace";
import { IUser } from "./User";

export class CommonProperties {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}

export class LoggedEntity extends CommonProperties {
  @OneToOne("User")
  @JoinColumn()
  user: IUser;

  @OneToOne("Workspace")
  @JoinColumn()
  workspace: IWorkspace;
}
