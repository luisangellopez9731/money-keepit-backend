import Joi from "joi";
import { Account } from "modules";
import { getEnumNumberValues } from "utils";
import { TransactionType } from ".";
import { CreateDto, UpdateDto } from "./dtos";

export const createSchema = Joi.object<CreateDto>({
  description: Joi.string().required().min(3).max(200),
  date: Joi.date().required(),
  type: Joi.valid(...getEnumNumberValues(TransactionType)).required(),
  amount: Joi.number().required().min(1).max(1000000000),
  account: Joi.string().required(),
  category: Joi.string().required(),
});

export const updateSchema = { ...createSchema };
