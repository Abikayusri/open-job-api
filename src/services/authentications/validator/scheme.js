import Joi from "joi";

export const postAuthenticationPayloadScheme = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const refreshTokenPayloadScheme = Joi.object({
    refreshToken: Joi.string().required()
})