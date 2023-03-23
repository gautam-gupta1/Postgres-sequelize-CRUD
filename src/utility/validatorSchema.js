import Joi from 'joi';

const pass_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/;

export const createUserSchema = Joi.object({
    login: Joi.string().email().required(),
    password: Joi.string().regex(pass_regex).required(),
    age: Joi.number().min(4).max(130).required()
});

export const updateUserSchema = Joi.object({
    login: Joi.string().email(),
    password: Joi.string().regex(pass_regex),
    age: Joi.number().min(4).max(130),
    isDeleted: Joi.boolean()
});
