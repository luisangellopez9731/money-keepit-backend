import { Workspace } from "modules";

export class UpdateDto {
  name?: string;
  description?: string;
  workspace: Workspace["id"];
}
