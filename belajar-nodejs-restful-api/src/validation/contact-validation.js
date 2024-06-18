import Joi from "joi";

export const updateContactValidation = Joi.object({
  id : Joi.number().positive().required(),
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).optional(),
  email: Joi.string().max(100).email().optional(),
  phoneNumber: Joi.string().max(20).optional(),
});

export const createContactValidation = Joi.object({
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).optional(),
  email: Joi.string().max(100).email().optional(),
  phoneNumber: Joi.string().max(20).optional(),
});

export const getContactValidation = Joi.number().positive().required();
