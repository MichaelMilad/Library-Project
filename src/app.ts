// Dependencies Imports
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet'; // Security headers
import cors from 'cors'; // CORS handling
import rateLimit from 'express-rate-limit'; // Rate limiting

// Modules Imports
import swaggerDocs from './config/swagger';
import routes from './router';
import { defineAssociations } from './config/associations';

// Initialize Express app
const app = express();

// Enable Helmet for security headers
app.use(helmet());

// Enable CORS
const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Rate limiting (limit each IP to 100 requests per minute)
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 100,
	message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Parse incoming JSON requests
app.use(express.json());

// Swagger Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
app.use('/api', routes);

// Define DB Relations
defineAssociations();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default app;
