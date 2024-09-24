import Joi from 'joi';

export const createBookSchema = Joi.object({
	title: Joi.string().min(3).max(255).required(),
	author: Joi.string().min(3).max(255).required(),
	isbn: Joi.string()
		.min(2)
		.max(13)
		.required()
		.regex(/^[0-9]{2,13}$/)
		.messages({
			'string.length': 'ISBN must be 2-13 digits long',
			'string.pattern.base': 'ISBN must be only digits',
		}),
	available_quantity: Joi.number().integer().min(0).optional(),
	shelf_location: Joi.string().min(1).max(255).required(),
});

export const updateBookSchema = Joi.object({
	title: Joi.string().min(3).max(255).optional(),
	author: Joi.string().min(3).max(255).optional(),
	available_quantity: Joi.number().integer().min(0).optional(),
	shelf_location: Joi.string().min(1).max(255).optional(),
}).min(1);

export const searchBooksSchema = Joi.object({
	title: Joi.string().optional(),
	author: Joi.string().optional(),
	isbn: Joi.string()
		.min(2)
		.max(13)
		.required()
		.regex(/^[0-9]{2,13}$/)
		.messages({
			'string.length': 'ISBN must be 2-13 digits long',
			'string.pattern.base': 'ISBN must be only digits',
		}),
})
	.min(1)
	.messages({
		'object.min': 'At least one search criterion is required',
	});
