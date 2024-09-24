import Joi from 'joi';

export const createBorrowerSchema = Joi.object({
	name: Joi.string().min(3).max(255).required(),
	email: Joi.string().email().required(),
	registered_date: Joi.date().iso().optional(),
});

export const updateBorrowerSchema = Joi.object({
	name: Joi.string().min(3).max(255).optional(),
	email: Joi.string().email().optional(),
	registered_date: Joi.date().iso().optional(), // Business argument as to allow this update or not
}).min(1);
