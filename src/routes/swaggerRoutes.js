import express from 'express';

const router = express.Router();

const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Book Management API',
    version: '1.0.0',
    description:
      'OpenAPI 3.0 specification for the Book Management API. The application currently uses express.json() only and does not implement JWT or API Key authentication.',
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Local development server',
    },
  ],
  tags: [
    {
      name: 'Authors',
      description: 'Author management endpoints',
    },
    {
      name: 'Books',
      description: 'Book management endpoints',
    },
  ],
  paths: {
    '/api/authors': {
      get: {
        tags: ['Authors'],
        summary: 'Get all authors',
        description: 'Returns the full list of authors stored in MongoDB.',
        responses: {
          200: {
            description: 'A list of authors',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Author' },
                },
                example: [
                  {
                    _id: '66b02d1f8c4d2a7d9f1a1234',
                    name: 'Oliver',
                    bio: 'Famous writer and speaker.',
                    nationality: 'American',
                    birthYear: 1883,
                    createdAt: '2026-08-02T08:00:00.000Z',
                    updatedAt: '2026-08-02T08:00:00.000Z',
                    __v: 0,
                  },
                ],
              },
            },
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                example: {
                  message: 'Internal server error',
                },
              },
            },
          },
        },
      },
    },
    '/api/authors/create': {
      post: {
        tags: ['Authors'],
        summary: 'Create a new author',
        description:
          'Creates a new author document. The `name` field is required. Other fields are optional.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AuthorCreateRequest' },
              examples: {
                default: {
                  summary: 'Create author example',
                  value: {
                    name: 'Oliver',
                    bio: 'He is known as a successful author.',
                    nationality: 'American',
                    birthYear: 1883,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Author created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Author' },
                example: {
                  _id: '66b02d1f8c4d2a7d9f1a1234',
                  name: 'Oliver',
                  bio: 'He is known as a successful author.',
                  nationality: 'American',
                  birthYear: 1883,
                  createdAt: '2026-08-02T08:00:00.000Z',
                  updatedAt: '2026-08-02T08:00:00.000Z',
                  __v: 0,
                },
              },
            },
          },
          400: {
            description: 'Validation or body parsing error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                example: {
                  message: 'Loi: Kiem tra lai du lieu',
                },
              },
            },
          },
        },
      },
    },
    '/api/authors/{id}': {
      get: {
        tags: ['Authors'],
        summary: 'Get author detail by ID',
        description:
          'Returns a single author document by MongoDB ObjectId. If the ObjectId format is invalid, the API responds with 400.',
        parameters: [
          {
            $ref: '#/components/parameters/IdParam',
          },
        ],
        responses: {
          200: {
            description: 'Author detail',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Author' },
                example: {
                  _id: '66b02d1f8c4d2a7d9f1a1234',
                  name: 'Oliver',
                  bio: 'He is known as a successful author.',
                  nationality: 'American',
                  birthYear: 1883,
                  createdAt: '2026-08-02T08:00:00.000Z',
                  updatedAt: '2026-08-02T08:00:00.000Z',
                  __v: 0,
                },
              },
            },
          },
          400: {
            description: 'Invalid ID format or request error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                example: {
                  message: 'Loi: Kiem tra lai ID',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Authors'],
        summary: 'Update an author by ID',
        description:
          'Updates an author document by MongoDB ObjectId. The API uses `findByIdAndUpdate` without `runValidators`, so partial updates are accepted.',
        parameters: [
          {
            $ref: '#/components/parameters/IdParam',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AuthorUpdateRequest' },
              examples: {
                default: {
                  summary: 'Update author example',
                  value: {
                    name: 'Oliver Napoleon Hill',
                    bio: 'He is known as a successful author.',
                    nationality: 'US',
                    birthYear: 1883,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Author updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Author' },
                example: {
                  _id: '66b02d1f8c4d2a7d9f1a1234',
                  name: 'Oliver Napoleon Hill',
                  bio: 'He is known as a successful author.',
                  nationality: 'US',
                  birthYear: 1883,
                  createdAt: '2026-08-02T08:00:00.000Z',
                  updatedAt: '2026-08-02T08:10:00.000Z',
                  __v: 0,
                },
              },
            },
          },
          400: {
            description: 'Invalid ID format or request error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                example: {
                  message: 'Loi: Kiem tra lai ID',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Authors'],
        summary: 'Delete an author by ID',
        description:
          'Deletes an author document by MongoDB ObjectId. The controller returns 204 on success.',
        parameters: [
          {
            $ref: '#/components/parameters/IdParam',
          },
        ],
        responses: {
          204: {
            description: 'Author deleted successfully',
          },
          400: {
            description: 'Invalid ID format or request error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                example: {
                  message: 'Loi: Kiem tra lai ID',
                },
              },
            },
          },
        },
      },
    },
    '/api/books': {
      get: {
        tags: ['Books'],
        summary: 'Get all books',
        description:
          'Returns all books. Supports optional filtering by `genre` and case-insensitive title search via `search`. The `author` field is populated in the response.',
        parameters: [
          {
            name: 'genre',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
            },
            description: 'Filter books by genre.',
            example: 'Business',
          },
          {
            name: 'search',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
            },
            description: 'Case-insensitive title search.',
            example: 'Think And Grow Rich',
          },
        ],
        responses: {
          200: {
            description: 'A list of books with populated author documents',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/BookPopulated' },
                },
                example: [
                  {
                    _id: '66b02e6a8c4d2a7d9f1a2345',
                    title: 'Think And Grow Rich',
                    description: 'A classic self-help book.',
                    price: 111,
                    publishedYear: 1937,
                    genre: 'Business',
                    author: {
                      _id: '66b02d1f8c4d2a7d9f1a1234',
                      name: 'Oliver',
                      bio: 'He is known as a successful author.',
                      nationality: 'American',
                      birthYear: 1883,
                      createdAt: '2026-08-02T08:00:00.000Z',
                      updatedAt: '2026-08-02T08:00:00.000Z',
                      __v: 0,
                    },
                    createdAt: '2026-08-02T08:15:00.000Z',
                    updatedAt: '2026-08-02T08:15:00.000Z',
                    __v: 0,
                  },
                ],
              },
            },
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                example: {
                  message: 'Internal server error',
                },
              },
            },
          },
        },
      },
    },
    '/api/books/create': {
      post: {
        tags: ['Books'],
        summary: 'Create a new book',
        description:
          'Creates a new book document. The `title` and `author` fields are required. `author` must be a valid MongoDB ObjectId that references an existing author.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/BookCreateRequest' },
              examples: {
                default: {
                  summary: 'Create book example',
                  value: {
                    title: 'Think And Grow Rich',
                    description:
                      'This book helps readers grow wealth and improve life.',
                    price: 111,
                    publishedYear: 1937,
                    genre: 'Business',
                    author: '66b02d1f8c4d2a7d9f1a1234',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Book created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BookWithAuthorId' },
                example: {
                  _id: '66b02e6a8c4d2a7d9f1a2345',
                  title: 'Think And Grow Rich',
                  description: 'This book helps readers grow wealth and improve life.',
                  price: 111,
                  publishedYear: 1937,
                  genre: 'Business',
                  author: '66b02d1f8c4d2a7d9f1a1234',
                  createdAt: '2026-08-02T08:15:00.000Z',
                  updatedAt: '2026-08-02T08:15:00.000Z',
                  __v: 0,
                },
              },
            },
          },
          400: {
            description: 'Validation, reference, or body parsing error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                example: {
                  message: 'Loi: Kiem tra lai Author ID hoac du lieu',
                },
              },
            },
          },
        },
      },
    },
    '/api/books/{id}': {
      get: {
        tags: ['Books'],
        summary: 'Get book detail by ID',
        description:
          'Returns a single book by MongoDB ObjectId. The `author` field is populated in the response.',
        parameters: [
          {
            $ref: '#/components/parameters/IdParam',
          },
        ],
        responses: {
          200: {
            description: 'Book detail with populated author',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BookPopulated' },
                example: {
                  _id: '66b02e6a8c4d2a7d9f1a2345',
                  title: 'Think And Grow Rich',
                  description: 'This book helps readers grow wealth and improve life.',
                  price: 111,
                  publishedYear: 1937,
                  genre: 'Business',
                  author: {
                    _id: '66b02d1f8c4d2a7d9f1a1234',
                    name: 'Oliver',
                    bio: 'He is known as a successful author.',
                    nationality: 'American',
                    birthYear: 1883,
                    createdAt: '2026-08-02T08:00:00.000Z',
                    updatedAt: '2026-08-02T08:00:00.000Z',
                    __v: 0,
                  },
                  createdAt: '2026-08-02T08:15:00.000Z',
                  updatedAt: '2026-08-02T08:15:00.000Z',
                  __v: 0,
                },
              },
            },
          },
          400: {
            description: 'Invalid ID format or request error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                example: {
                  message: 'Loi: Kiem tra lai ID',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Books'],
        summary: 'Update a book by ID',
        description:
          'Updates a book document by MongoDB ObjectId. The API uses `findByIdAndUpdate` without `runValidators`, so partial updates are accepted.',
        parameters: [
          {
            $ref: '#/components/parameters/IdParam',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/BookUpdateRequest' },
              examples: {
                default: {
                  summary: 'Update book example',
                  value: {
                    title: 'Think And Grow Rich',
                    description:
                      'This book helps readers grow wealth and improve life.',
                    price: 130,
                    publishedYear: 1937,
                    genre: 'Skills',
                    author: '66b02d1f8c4d2a7d9f1a1234',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Book updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BookWithAuthorId' },
                example: {
                  _id: '66b02e6a8c4d2a7d9f1a2345',
                  title: 'Think And Grow Rich',
                  description: 'This book helps readers grow wealth and improve life.',
                  price: 130,
                  publishedYear: 1937,
                  genre: 'Skills',
                  author: '66b02d1f8c4d2a7d9f1a1234',
                  createdAt: '2026-08-02T08:15:00.000Z',
                  updatedAt: '2026-08-02T08:20:00.000Z',
                  __v: 0,
                },
              },
            },
          },
          400: {
            description: 'Invalid ID format or request error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                example: {
                  message: 'Loi: Kiem tra lai ID',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Books'],
        summary: 'Delete a book by ID',
        description:
          'Deletes a book document by MongoDB ObjectId. The controller returns 204 on success.',
        parameters: [
          {
            $ref: '#/components/parameters/IdParam',
          },
        ],
        responses: {
          204: {
            description: 'Book deleted successfully',
          },
          400: {
            description: 'Invalid ID format or request error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                example: {
                  message: 'Loi: Kiem tra lai ID',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    parameters: {
      IdParam: {
        name: 'id',
        in: 'path',
        required: true,
        description: 'MongoDB ObjectId',
        schema: {
          type: 'string',
          pattern: '^[a-fA-F0-9]{24}$',
          example: '66b02d1f8c4d2a7d9f1a1234',
        },
      },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Loi: Kiem tra lai ID',
          },
        },
        required: ['message'],
      },
      Author: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '66b02d1f8c4d2a7d9f1a1234',
          },
          name: {
            type: 'string',
            example: 'Oliver',
          },
          bio: {
            type: 'string',
            nullable: true,
            example: 'He is known as a successful author.',
          },
          nationality: {
            type: 'string',
            nullable: true,
            example: 'American',
          },
          birthYear: {
            type: 'integer',
            nullable: true,
            example: 1883,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-08-02T08:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-08-02T08:00:00.000Z',
          },
          __v: {
            type: 'integer',
            example: 0,
          },
        },
        required: ['_id', 'name'],
      },
      AuthorCreateRequest: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Oliver',
          },
          bio: {
            type: 'string',
            example: 'He is known as a successful author.',
          },
          nationality: {
            type: 'string',
            example: 'American',
          },
          birthYear: {
            type: 'integer',
            example: 1883,
          },
        },
        required: ['name'],
      },
      AuthorUpdateRequest: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Oliver Napoleon Hill',
          },
          bio: {
            type: 'string',
            example: 'He is known as a successful author.',
          },
          nationality: {
            type: 'string',
            example: 'US',
          },
          birthYear: {
            type: 'integer',
            example: 1883,
          },
        },
      },
      BookAuthorRef: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '66b02d1f8c4d2a7d9f1a1234',
          },
          name: {
            type: 'string',
            example: 'Oliver',
          },
          bio: {
            type: 'string',
            nullable: true,
            example: 'He is known as a successful author.',
          },
          nationality: {
            type: 'string',
            nullable: true,
            example: 'American',
          },
          birthYear: {
            type: 'integer',
            nullable: true,
            example: 1883,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-08-02T08:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-08-02T08:00:00.000Z',
          },
          __v: {
            type: 'integer',
            example: 0,
          },
        },
        required: ['_id', 'name'],
      },
      BookBase: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '66b02e6a8c4d2a7d9f1a2345',
          },
          title: {
            type: 'string',
            example: 'Think And Grow Rich',
          },
          description: {
            type: 'string',
            nullable: true,
            example: 'This book helps readers grow wealth and improve life.',
          },
          price: {
            type: 'number',
            format: 'float',
            nullable: true,
            minimum: 0,
            example: 111,
          },
          publishedYear: {
            type: 'integer',
            nullable: true,
            example: 1937,
          },
          genre: {
            type: 'string',
            nullable: true,
            example: 'Business',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-08-02T08:15:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-08-02T08:15:00.000Z',
          },
          __v: {
            type: 'integer',
            example: 0,
          },
        },
        required: ['_id', 'title', 'author'],
      },
      BookPopulated: {
        allOf: [
          { $ref: '#/components/schemas/BookBase' },
          {
            type: 'object',
            properties: {
              author: {
                $ref: '#/components/schemas/BookAuthorRef',
              },
            },
          },
        ],
      },
      BookWithAuthorId: {
        allOf: [
          { $ref: '#/components/schemas/BookBase' },
          {
            type: 'object',
            properties: {
              author: {
                type: 'string',
                description: 'MongoDB ObjectId of the related author',
                example: '66b02d1f8c4d2a7d9f1a1234',
              },
            },
          },
        ],
      },
      BookCreateRequest: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'Think And Grow Rich',
          },
          description: {
            type: 'string',
            example: 'This book helps readers grow wealth and improve life.',
          },
          price: {
            type: 'number',
            format: 'float',
            minimum: 0,
            example: 111,
          },
          publishedYear: {
            type: 'integer',
            example: 1937,
            description: 'Should not be in the future.',
          },
          genre: {
            type: 'string',
            example: 'Business',
          },
          author: {
            type: 'string',
            description: 'MongoDB ObjectId of an existing author.',
            pattern: '^[a-fA-F0-9]{24}$',
            example: '66b02d1f8c4d2a7d9f1a1234',
          },
        },
        required: ['title', 'author'],
      },
      BookUpdateRequest: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'Think And Grow Rich',
          },
          description: {
            type: 'string',
            example: 'This book helps readers grow wealth and improve life.',
          },
          price: {
            type: 'number',
            format: 'float',
            minimum: 0,
            example: 130,
          },
          publishedYear: {
            type: 'integer',
            example: 1937,
            description: 'Should not be in the future.',
          },
          genre: {
            type: 'string',
            example: 'Skills',
          },
          author: {
            type: 'string',
            description: 'MongoDB ObjectId of an existing author.',
            pattern: '^[a-fA-F0-9]{24}$',
            example: '66b02d1f8c4d2a7d9f1a1234',
          },
        },
      },
    },
    securitySchemes: {},
  },
  security: [],
};

router.get('/', (req, res) => {
  res.json(swaggerSpec);
});

export default router;
