import Joi from "joi";

export const categoryPayloadScheme = Joi.object({
   name: Joi.string().required()
});