import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import openApiSpec from './config/swagger.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",

  "https://book-management-api-uzll.onrender.com",
  // Vercel frontend
  "https://book-management-fe-ntyn.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Cho phép request không có Origin
      // Ví dụ: Postman, Swagger, server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],

    credentials: true,
  })
);

app.use(express.json());
connectDB();

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

app.get('/swagger.json', (req, res) => {
  res.json(openApiSpec);
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(openApiSpec, {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      displayRequestDuration: true,
      filter: true,
      persistAuthorization: true,
    },
    customSiteTitle: 'Book Management API - Swagger',
    customCss: `
      body {
        background: #111417;
      }
      .swagger-ui .topbar {
        background-color: #1b1f23;
        border-bottom: 1px solid #2d333b;
      }
      .swagger-ui .topbar .download-url-wrapper {
        display: none;
      }
      .swagger-ui .info .title,
      .swagger-ui .info p,
      .swagger-ui .opblock-tag,
      .swagger-ui .scheme-container,
      .swagger-ui,
      .swagger-ui .model-title,
      .swagger-ui .response-col_status,
      .swagger-ui .response-col_description,
      .swagger-ui .opblock .opblock-summary-description,
      .swagger-ui .opblock .opblock-summary-path,
      .swagger-ui .opblock .opblock-summary-method,
      .swagger-ui .parameter__name,
      .swagger-ui .parameter__type,
      .swagger-ui .parameter__in,
      .swagger-ui .tab li,
      .swagger-ui .body-param-options label,
      .swagger-ui .response-col_links,
      .swagger-ui .responses-inner h4,
      .swagger-ui .responses-inner h5,
      .swagger-ui .responses-inner h6 {
        color: #e6edf3 !important;
      }
      .swagger-ui .info {
        margin: 40px 0;
      }
      .swagger-ui .opblock {
        background: #161b22;
        border-color: #30363d;
      }
      .swagger-ui .opblock.opblock-get {
        border-color: #58a6ff;
        background: rgba(88, 166, 255, 0.08);
      }
      .swagger-ui .opblock.opblock-post {
        border-color: #3fb950;
        background: rgba(63, 185, 80, 0.08);
      }
      .swagger-ui .opblock.opblock-put {
        border-color: #d29922;
        background: rgba(210, 153, 34, 0.08);
      }
      .swagger-ui .opblock.opblock-delete {
        border-color: #f85149;
        background: rgba(248, 81, 73, 0.08);
      }
      .swagger-ui .btn {
        border-radius: 8px;
      }
      .swagger-ui section.models {
        border-color: #30363d;
        background: #161b22;
      }
      .swagger-ui .model {
        background: #21262d;
        border-radius: 8px;
      }
      .swagger-ui input,
      .swagger-ui textarea,
      .swagger-ui select {
        background: #0d1117;
        color: #e6edf3;
        border-color: #30363d;
      }
      .swagger-ui .btn.authorize,
      .swagger-ui .btn.execute {
        box-shadow: none;
      }
    `,
  }),
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`ðŸš€ Server: <http://localhost>:${PORT}`));



