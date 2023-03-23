import { createUserSchema, updateUserSchema } from 'utility/validatorSchema.js';

const validation = (schema) => (body) => {
    return schema.validate(body, { abortEarly:false });
};

export const createUserValidator = validation(createUserSchema);
export const  updateUserValidator = validation(updateUserSchema);
