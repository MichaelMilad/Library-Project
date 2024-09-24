import swaggerJsdoc from 'swagger-jsdoc';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Library Management API',
			version: '1.0.0',
		},
		servers: [{ url: 'http://localhost:3000' }],
	},
	apis: ['./src/components/**/**.controller.ts'],
};

const swaggerDocs = swaggerJsdoc(options);
export default swaggerDocs;
