import { Workspace } from "modules";

export class CreateDto {
  name: string;
  description?: string;
  amount?: number;
  workspace: Workspace["id"];
}
