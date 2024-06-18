import Joi from "joi";

export const updateContactValidation = Joi.object({
  id: Joi.number().positive().required(),
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

export const searchContactValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().default(10),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
});
