import Joi from "joi";

export const applicationPayloadScheme = Joi.object({
    user_id: Joi.string().required(),
    job_id: Joi.string().required(),
    status: Joi.string().default('pending'),
});

export const applicationStatusPayloadScheme = Joi.object({
    status: Joi.string().required(),
});
