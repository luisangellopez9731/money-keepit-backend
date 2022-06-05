import Joi from "joi";
import { workspaceData } from "modules/common";
import { CreateDto, UpdateDto } from "./dtos";

export const createSchema = Joi.object<CreateDto>({
  name: Joi.string().required().min(3).max(30),
  description: Joi.string().optional(),
  amount: Joi.number().optional().default(0),
}).concat(workspaceData);

export const updateSchema = Joi.object<UpdateDto>({
  name: Joi.string().min(3).max(30),
  description: Joi.string().optional(),
}).concat(workspaceData);
