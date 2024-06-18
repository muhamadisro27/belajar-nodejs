import Joi from "joi";

export const createAddressValidation = Joi.object({
  street: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  province: Joi.string().max(100).optional(),
  country: Joi.string().max(100).required(),
  postalCode: Joi.string().max(10).optional(),
});

export const updateAddressValidation = Joi.object({
  id: Joi.number().positive().required(),
  street: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  province: Joi.string().max(100).optional(),
  country: Joi.string().max(100).required(),
  postalCode: Joi.string().max(10).optional(),
});

export const getAddressValidation = Joi.number().positive().required();
