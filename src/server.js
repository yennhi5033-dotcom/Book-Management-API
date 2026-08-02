import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import openApiSpec from './config/swagger.js';
import swaggerUi from 'swagger-ui-express';

dotenv.config();
const app = express();

app.use(express.json());
connectDB();

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server: <http://localhost>:${PORT}` ));
