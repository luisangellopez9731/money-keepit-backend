import { TransactionType } from "modules";

export class CreateDto {
  name: string;

  icon: string;

  type: TransactionType;
}
