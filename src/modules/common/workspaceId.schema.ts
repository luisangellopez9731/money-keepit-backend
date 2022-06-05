import Joi from "joi";

export const workspaceData = Joi.object({
  workspace: Joi.string().required(),
});
