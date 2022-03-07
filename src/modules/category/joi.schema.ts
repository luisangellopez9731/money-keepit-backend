import Joi from "joi";
import { getEnumNumberValues } from "utils";
import { TransactionType } from "../transaction";
import { CreateDto } from "./dtos";

export const createSchema = Joi.object<CreateDto>({
  name: Joi.string().required(),
  icon: Joi.string().required(),
  type: Joi.valid(...getEnumNumberValues(TransactionType)).required(),
});

export const updateSchema = { ...createSchema };
