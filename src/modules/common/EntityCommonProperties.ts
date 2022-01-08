import {
  AfterInsert,
  AfterUpdate,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

export class CommonProperties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  createdDate: Date;

  @Column()
  updatedDate: Date;

  @AfterInsert()
  setCreatedAndUpdateDates() {
    const dateNow = new Date();
    this.createdDate = dateNow;
    this.updatedDate = dateNow;
  }

  @AfterUpdate()
  updateUpdatedDate() {
    this.updatedDate = new Date();
  }
}
