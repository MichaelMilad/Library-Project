import Joi from 'joi';

export const borrowBookSchema = Joi.object({
	isbn: Joi.string()
		.min(2)
		.max(13)
		.required()
		.regex(/^[0-9]{2,13}$/)
		.messages({
			'string.length': 'ISBN must be 2-13 digits long',
			'string.pattern.base': 'ISBN must be only digits',
		}),
	borrower_email: Joi.string().email().required(),
	borrowed_date: Joi.date().iso().optional(),
	due_date: Joi.date().iso().required(),
});

// Validation schema for returning a book
export const returnBookSchema = Joi.object({
	isbn: Joi.string()
		.min(2)
		.max(13)
		.required()
		.regex(/^[0-9]{2,13}$/)
		.messages({
			'string.length': 'ISBN must be 2-13 digits long',
			'string.pattern.base': 'ISBN must be only digits',
		}),
	borrower_email: Joi.string().email().required(),
});
