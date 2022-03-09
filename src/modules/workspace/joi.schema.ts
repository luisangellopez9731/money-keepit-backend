import Joi from "joi";
import { CreateDto, UpdateDto } from "./dtos";

export const createSchema = Joi.object<CreateDto>({
  name: Joi.string().required().min(3).max(30),
  description: Joi.string().optional(),
});

export const updateSchema = Joi.object<UpdateDto>({
  name: Joi.string().min(3).max(30),
  description: Joi.string().optional(),
});
