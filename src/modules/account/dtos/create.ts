import { Workspace } from "modules";

export class CreateDto {
  name: string;
  description?: string;
  initialAmount?: number;
  workspace: Workspace["id"];
}
