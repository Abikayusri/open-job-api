import Joi from "joi";

export const companyPayloadScheme = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().allow(''),
});
