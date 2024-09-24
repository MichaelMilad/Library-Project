// Dependencies Imports
import express from 'express';
import swaggerUi from 'swagger-ui-express';

// Modules Imports
import swaggerDocs from './config/swagger';
import routes from './router';
import { defineAssociations } from './config/associations';

const app = express();

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
