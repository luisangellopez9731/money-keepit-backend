import Joi from "joi";
import { Account } from "./Account.entity";

export const createSchema = Joi.object<Account>({
  name: Joi.string().required().min(3).max(30),
  description: Joi.string().optional(),
  initialAmount: Joi.number().optional().default(0),
});
