import Joi from "joi";

export const jobPayloadScheme = Joi.object({
    company_id: Joi.string().required(),
    category_id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    job_type: Joi.string(),
    experience_level: Joi.string(),
    location_type: Joi.string(),
    location_city: Joi.string().allow(''),
    salary_min: Joi.number().integer().min(0),
    salary_max: Joi.number().integer().min(0),
    is_salary_visible: Joi.boolean().default(true),
    status: Joi.string().default('open'),
});

export const jobQueryScheme = Joi.object({
    title: Joi.string().allow(''),
    'company-name': Joi.string().allow(''),
});
