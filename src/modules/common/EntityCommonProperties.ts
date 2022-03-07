import {
  AfterInsert,
  AfterUpdate,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

export class CommonProperties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  createdDate: Date;

  @Column()
  updatedDate: Date;

  // @AfterUpdate()
  // updateUpdatedDate() {
  //   this.updatedDate = new Date();
  // }
  @BeforeInsert()
  private setCreateUpdateDate(): void {
    this.createdDate = new Date();
    this.updatedDate = new Date();
  }

  @BeforeUpdate()
  public setUpdateDate(): void {
    this.updatedDate = new Date();
  }
}
