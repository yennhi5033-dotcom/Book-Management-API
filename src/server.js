import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import swaggerRoutes from './routes/swaggerRoutes.js';



dotenv.config();
const app = express();

app.use(express.json());
connectDB();

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/swagger', swaggerRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server: <http://localhost>:${PORT}` ));
