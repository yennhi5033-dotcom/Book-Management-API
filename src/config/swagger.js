import dotenv from 'dotenv';
dotenv.config();
const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Book Management API',
    version: '1.0.0',
    description:
      'Tài liệu OpenAPI 3.0 cho project Node.js quản lý sách và tác giả. ' +
      'API hiện tại chưa có middleware xác thực JWT/API Key, nên tất cả endpoint đều public.',
  },
  servers: [
    {
      url: process.env.API_URL,
      description: 'Local development server',
    },
  ],
  tags: [
    {
      name: 'Authors',
      description: 'Quản lý tác giả',
    },
    {
      name: 'Books',
      description: 'Quản lý sách',
    },
  ],
  paths: {
    '/api/authors/create': {
      post: {
        tags: ['Authors'],
        summary: 'Tạo tác giả mới',
        description:
          'Tạo một tác giả mới trong hệ thống. Endpoint không yêu cầu xác thực.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthorInput',
              },
              examples: {
                default: {
                  summary: 'Ví dụ tạo tác giả',
                  value: {
                    name: 'Nguyen Nhat Anh',
                    bio: 'Nha van Viet Nam noi tieng voi truyen thieu nhi va tieu thuyet tuoi tre.',
                    nationality: 'Vietnamese',
                    birthYear: 1955,
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Tạo tác giả thành công',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthorDocument',
                },
                examples: {
                  default: {
                    summary: 'Tác giả vừa tạo',
                    value: {
                      _id: '66ac0f1a7b0d3e0f2c3a1111',
                      name: 'Nguyen Nhat Anh',
                      bio: 'Nha van Viet Nam noi tieng voi truyen thieu nhi va tieu thuyet tuoi tre.',
                      nationality: 'Vietnamese',
                      birthYear: 1955,
                      createdAt: '2026-08-02T10:00:00.000Z',
                      updatedAt: '2026-08-02T10:00:00.000Z',
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Dữ liệu không hợp lệ',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  default: {
                    value: {
                      message: 'Lỗi: Kiểm tra lại dữ liệu',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/authors': {
      get: {
        tags: ['Authors'],
        summary: 'Lấy danh sách tác giả',
        description: 'Trả về toàn bộ danh sách tác giả hiện có trong database.',
        responses: {
          '200': {
            description: 'Danh sách tác giả',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/AuthorDocument' },
                },
                examples: {
                  default: {
                    value: [
                      {
                        _id: '66ac0f1a7b0d3e0f2c3a1111',
                        name: 'Nguyen Nhat Anh',
                        bio: 'Nha van Viet Nam noi tieng voi truyen thieu nhi va tieu thuyet tuoi tre.',
                        nationality: 'Vietnamese',
                        birthYear: 1955,
                        createdAt: '2026-08-02T10:00:00.000Z',
                        updatedAt: '2026-08-02T10:00:00.000Z',
                        __v: 0,
                      },
                    ],
                  },
                },
              },
            },
          },
          '500': {
            description: 'Lỗi máy chủ',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  default: {
                    value: {
                      message: 'Internal server error',
                    },
                  },
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
        summary: 'Lấy chi tiết tác giả theo ID',
        description:
          'Trả về thông tin tác giả theo Mongo ObjectId. Nếu ID hợp lệ nhưng không tìm thấy tác giả, controller hiện trả về `null` với status 200.',
        parameters: [
          {
            $ref: '#/components/parameters/IdParam',
          },
        ],
        responses: {
          '200': {
            description: 'Chi tiết tác giả hoặc `null` nếu không tìm thấy bản ghi',
            content: {
              'application/json': {
                schema: {
                  allOf: [{ $ref: '#/components/schemas/AuthorDocument' }],
                  nullable: true,
                },
                examples: {
                  default: {
                    value: {
                      _id: '66ac0f1a7b0d3e0f2c3a1111',
                      name: 'Nguyen Nhat Anh',
                      bio: 'Nha van Viet Nam noi tieng voi truyen thieu nhi va tieu thuyet tuoi tre.',
                      nationality: 'Vietnamese',
                      birthYear: 1955,
                      createdAt: '2026-08-02T10:00:00.000Z',
                      updatedAt: '2026-08-02T10:00:00.000Z',
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'ID không hợp lệ',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  default: {
                    value: {
                      message: 'Lỗi: Kiểm tra lại ID',
                    },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Authors'],
        summary: 'Cập nhật tác giả',
        description:
          'Cập nhật một phần hoặc toàn bộ thông tin tác giả theo ID. Các field không gửi lên sẽ được giữ nguyên.',
        parameters: [
          {
            $ref: '#/components/parameters/IdParam',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthorUpdateInput',
              },
              examples: {
                default: {
                  summary: 'Ví dụ cập nhật tác giả',
                  value: {
                    bio: 'Tac gia chuyen viet van hoc thieu nhi va tieu thuyet lua tuoi moi lon.',
                    nationality: 'Vietnamese',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description:
              'Cập nhật tác giả thành công. Nếu ID hợp lệ nhưng không tìm thấy bản ghi, response có thể là `null`.',
            content: {
              'application/json': {
                schema: {
                  allOf: [{ $ref: '#/components/schemas/AuthorDocument' }],
                  nullable: true,
                },
                examples: {
                  default: {
                    value: {
                      _id: '66ac0f1a7b0d3e0f2c3a1111',
                      name: 'Nguyen Nhat Anh',
                      bio: 'Tac gia chuyen viet van hoc thieu nhi va tieu thuyet lua tuoi moi lon.',
                      nationality: 'Vietnamese',
                      birthYear: 1955,
                      createdAt: '2026-08-02T10:00:00.000Z',
                      updatedAt: '2026-08-02T10:10:00.000Z',
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'ID hoặc dữ liệu không hợp lệ',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  default: {
                    value: {
                      message: 'Lỗi: Kiểm tra lại ID',
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Authors'],
        summary: 'Xóa tác giả',
        description: 'Xóa tác giả theo ID.',
        parameters: [
          {
            $ref: '#/components/parameters/IdParam',
          },
        ],
        responses: {
          '204': {
            description: 'Xóa thành công',
          },
          '400': {
            description: 'ID không hợp lệ',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  default: {
                    value: {
                      message: 'Lỗi: Kiểm tra lại ID',
                    },
                  },
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
        summary: 'Tạo sách mới',
        description:
          'Tạo một quyển sách mới. Trường `author` bắt buộc phải là ObjectId hợp lệ của một tác giả đã tồn tại.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BookInput',
              },
              examples: {
                default: {
                  summary: 'Ví dụ tạo sách',
                  value: {
                    title: 'Mat Biec',
                    description: 'Tieu thuyet noi tieng cua Nguyen Nhat Anh.',
                    price: 120000,
                    publishedYear: 2019,
                    genre: 'Fiction',
                    author: '66ac0f1a7b0d3e0f2c3a1111',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Tạo sách thành công',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BookDocument' },
                examples: {
                  default: {
                    value: {
                      _id: '66ac0f1a7b0d3e0f2c3a2222',
                      title: 'Mat Biec',
                      description: 'Tieu thuyet noi tieng cua Nguyen Nhat Anh.',
                      price: 120000,
                      publishedYear: 2019,
                      genre: 'Fiction',
                      author: '66ac0f1a7b0d3e0f2c3a1111',
                      createdAt: '2026-08-02T10:00:00.000Z',
                      updatedAt: '2026-08-02T10:00:00.000Z',
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Dữ liệu không hợp lệ hoặc author ID không tồn tại',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  default: {
                    value: {
                      message: 'Lỗi: Kiểm tra lại Author ID hoặc dữ liệu',
                    },
                  },
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
        summary: 'Lấy danh sách sách',
        description:
          'Trả về danh sách sách. Hỗ trợ lọc theo `genre` và tìm kiếm theo `search` trong tiêu đề (không phân biệt hoa thường). Tác giả sẽ được populate thành object đầy đủ.',
        parameters: [
          {
            name: 'genre',
            in: 'query',
            required: false,
            description: 'Lọc theo thể loại sách',
            schema: {
              type: 'string',
              example: 'Fiction',
            },
          },
          {
            name: 'search',
            in: 'query',
            required: false,
            description: 'Tìm kiếm theo tiêu đề sách, không phân biệt hoa thường',
            schema: {
              type: 'string',
              example: 'mat biec',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Danh sách sách',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/BookPopulatedDocument' },
                },
                examples: {
                  default: {
                    value: [
                      {
                        _id: '66ac0f1a7b0d3e0f2c3a2222',
                        title: 'Mat Biec',
                        description: 'Tieu thuyet noi tieng cua Nguyen Nhat Anh.',
                        price: 120000,
                        publishedYear: 2019,
                        genre: 'Fiction',
                        author: {
                          _id: '66ac0f1a7b0d3e0f2c3a1111',
                          name: 'Nguyen Nhat Anh',
                          bio: 'Nha van Viet Nam noi tieng voi truyen thieu nhi va tieu thuyet tuoi tre.',
                          nationality: 'Vietnamese',
                          birthYear: 1955,
                          createdAt: '2026-08-02T10:00:00.000Z',
                          updatedAt: '2026-08-02T10:00:00.000Z',
                          __v: 0,
                        },
                        createdAt: '2026-08-02T10:00:00.000Z',
                        updatedAt: '2026-08-02T10:00:00.000Z',
                        __v: 0,
                      },
                    ],
                  },
                },
              },
            },
          },
          '500': {
            description: 'Lỗi máy chủ',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  default: {
                    value: {
                      message: 'Internal server error',
                    },
                  },
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
        summary: 'Lấy chi tiết sách theo ID',
        description:
          'Trả về chi tiết sách theo ID. Trường `author` được populate thành object đầy đủ. Nếu ID hợp lệ nhưng không tìm thấy sách, controller hiện trả về `null` với status 200.',
        parameters: [
          {
            $ref: '#/components/parameters/IdParam',
          },
        ],
        responses: {
          '200': {
            description: 'Chi tiết sách hoặc `null` nếu không tìm thấy bản ghi',
            content: {
              'application/json': {
                schema: {
                  allOf: [{ $ref: '#/components/schemas/BookPopulatedDocument' }],
                  nullable: true,
                },
                examples: {
                  default: {
                    value: {
                      _id: '66ac0f1a7b0d3e0f2c3a2222',
                      title: 'Mat Biec',
                      description: 'Tieu thuyet noi tieng cua Nguyen Nhat Anh.',
                      price: 120000,
                      publishedYear: 2019,
                      genre: 'Fiction',
                      author: {
                        _id: '66ac0f1a7b0d3e0f2c3a1111',
                        name: 'Nguyen Nhat Anh',
                        bio: 'Nha van Viet Nam noi tieng voi truyen thieu nhi va tieu thuyet tuoi tre.',
                        nationality: 'Vietnamese',
                        birthYear: 1955,
                        createdAt: '2026-08-02T10:00:00.000Z',
                        updatedAt: '2026-08-02T10:00:00.000Z',
                        __v: 0,
                      },
                      createdAt: '2026-08-02T10:00:00.000Z',
                      updatedAt: '2026-08-02T10:00:00.000Z',
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'ID không hợp lệ',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  default: {
                    value: {
                      message: 'Lỗi: Kiểm tra lại ID',
                    },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Books'],
        summary: 'Cập nhật sách',
        description:
          'Cập nhật một phần hoặc toàn bộ thông tin sách theo ID. Response của endpoint này là document sách chưa populate `author`.',
        parameters: [
          {
            $ref: '#/components/parameters/IdParam',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BookUpdateInput',
              },
              examples: {
                default: {
                  summary: 'Ví dụ cập nhật sách',
                  value: {
                    price: 135000,
                    genre: 'Classic Fiction',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description:
              'Cập nhật sách thành công. Nếu ID hợp lệ nhưng không tìm thấy bản ghi, response có thể là `null`.',
            content: {
              'application/json': {
                schema: {
                  allOf: [{ $ref: '#/components/schemas/BookDocument' }],
                  nullable: true,
                },
                examples: {
                  default: {
                    value: {
                      _id: '66ac0f1a7b0d3e0f2c3a2222',
                      title: 'Mat Biec',
                      description: 'Tieu thuyet noi tieng cua Nguyen Nhat Anh.',
                      price: 135000,
                      publishedYear: 2019,
                      genre: 'Classic Fiction',
                      author: '66ac0f1a7b0d3e0f2c3a1111',
                      createdAt: '2026-08-02T10:00:00.000Z',
                      updatedAt: '2026-08-02T10:10:00.000Z',
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'ID hoặc dữ liệu không hợp lệ',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  default: {
                    value: {
                      message: 'Lỗi: Kiểm tra lại ID',
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Books'],
        summary: 'Xóa sách',
        description: 'Xóa sách theo ID.',
        parameters: [
          {
            $ref: '#/components/parameters/IdParam',
          },
        ],
        responses: {
          '204': {
            description: 'Xóa thành công',
          },
          '400': {
            description: 'ID không hợp lệ',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  default: {
                    value: {
                      message: 'Lỗi: Kiểm tra lại ID',
                    },
                  },
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
        description: 'MongoDB ObjectId của resource',
        schema: {
          type: 'string',
          pattern: '^[a-fA-F0-9]{24}$',
          example: '66ac0f1a7b0d3e0f2c3a1111',
        },
      },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Lỗi: Kiểm tra lại ID',
          },
        },
      },
      AuthorInput: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            example: 'Nguyen Nhat Anh',
          },
          bio: {
            type: 'string',
            nullable: true,
            example: 'Nha van Viet Nam noi tieng voi truyen thieu nhi va tieu thuyet tuoi tre.',
          },
          nationality: {
            type: 'string',
            nullable: true,
            example: 'Vietnamese',
          },
          birthYear: {
            type: 'integer',
            format: 'int32',
            nullable: true,
            example: 1955,
          },
        },
        additionalProperties: true,
      },
      AuthorUpdateInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Nguyen Nhat Anh',
          },
          bio: {
            type: 'string',
            nullable: true,
            example: 'Tac gia chuyen viet van hoc thieu nhi va tieu thuyet lua tuoi moi lon.',
          },
          nationality: {
            type: 'string',
            nullable: true,
            example: 'Vietnamese',
          },
          birthYear: {
            type: 'integer',
            format: 'int32',
            nullable: true,
            example: 1955,
          },
        },
        additionalProperties: true,
      },
      AuthorDocument: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '66ac0f1a7b0d3e0f2c3a1111',
          },
          name: {
            type: 'string',
            example: 'Nguyen Nhat Anh',
          },
          bio: {
            type: 'string',
            nullable: true,
          },
          nationality: {
            type: 'string',
            nullable: true,
          },
          birthYear: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
          __v: {
            type: 'integer',
            format: 'int32',
            example: 0,
          },
        },
      },
      BookInput: {
        type: 'object',
        required: ['title', 'author'],
        properties: {
          title: {
            type: 'string',
            example: 'Mat Biec',
          },
          description: {
            type: 'string',
            nullable: true,
            example: 'Tieu thuyet noi tieng cua Nguyen Nhat Anh.',
          },
          price: {
            type: 'number',
            format: 'double',
            minimum: 0,
            nullable: true,
            example: 120000,
          },
          publishedYear: {
            type: 'integer',
            format: 'int32',
            nullable: true,
            description: 'Năm xuất bản. Model hiện tại chỉ kiểm tra không lớn hơn năm hiện tại.',
            example: 2019,
          },
          genre: {
            type: 'string',
            nullable: true,
            example: 'Fiction',
          },
          author: {
            type: 'string',
            description: 'ObjectId của tác giả tham chiếu tới collection Author',
            pattern: '^[a-fA-F0-9]{24}$',
            example: '66ac0f1a7b0d3e0f2c3a1111',
          },
        },
        additionalProperties: true,
      },
      BookUpdateInput: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'Mat Biec',
          },
          description: {
            type: 'string',
            nullable: true,
            example: 'Tieu thuyet noi tieng cua Nguyen Nhat Anh.',
          },
          price: {
            type: 'number',
            format: 'double',
            minimum: 0,
            nullable: true,
            example: 120000,
          },
          publishedYear: {
            type: 'integer',
            format: 'int32',
            nullable: true,
            description: 'Năm xuất bản. Model hiện tại chỉ kiểm tra không lớn hơn năm hiện tại.',
            example: 2019,
          },
          genre: {
            type: 'string',
            nullable: true,
            example: 'Fiction',
          },
          author: {
            type: 'string',
            description: 'ObjectId của tác giả tham chiếu tới collection Author',
            pattern: '^[a-fA-F0-9]{24}$',
            example: '66ac0f1a7b0d3e0f2c3a1111',
          },
        },
        additionalProperties: true,
      },
      BookDocument: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '66ac0f1a7b0d3e0f2c3a2222',
          },
          title: {
            type: 'string',
            example: 'Mat Biec',
          },
          description: {
            type: 'string',
            nullable: true,
          },
          price: {
            type: 'number',
            format: 'double',
            nullable: true,
          },
          publishedYear: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          genre: {
            type: 'string',
            nullable: true,
          },
          author: {
            type: 'string',
            description:
              'ObjectId tác giả. Ở endpoint list/detail field này sẽ được populate thành object đầy đủ.',
            example: '66ac0f1a7b0d3e0f2c3a1111',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
          __v: {
            type: 'integer',
            format: 'int32',
            example: 0,
          },
        },
      },
      BookPopulatedDocument: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '66ac0f1a7b0d3e0f2c3a2222',
          },
          title: {
            type: 'string',
            example: 'Mat Biec',
          },
          description: {
            type: 'string',
            nullable: true,
          },
          price: {
            type: 'number',
            format: 'double',
            nullable: true,
          },
          publishedYear: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          genre: {
            type: 'string',
            nullable: true,
          },
          author: {
            oneOf: [
              { $ref: '#/components/schemas/AuthorDocument' },
              {
                type: 'string',
                description: 'Trong một số trường hợp chưa populate, author có thể là ObjectId',
              },
            ],
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
          __v: {
            type: 'integer',
            format: 'int32',
            example: 0,
          },
        },
      },
    },
  },
};

export default swaggerSpec;
