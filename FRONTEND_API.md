# Book Management API – Frontend Integration Guide

## 1. Overview

REST API for managing authors and books.

- Base URL (local): `http://localhost:3001`
- JSON request body: send `Content-Type: application/json`
- Authentication: none is currently implemented
- Swagger UI: `GET /api-docs`
- OpenAPI JSON: `GET /swagger.json`
- All resource IDs are MongoDB ObjectId strings

The API currently exposes CRUD operations under `/api/authors` and `/api/books`.

## 2. Common response rules

### Success

Successful responses return JSON directly, without an envelope such as `{ data: ... }`.

- List: JSON array
- Detail/create/update: JSON object
- Delete: HTTP `204 No Content`; the server attempts to include `{ "message": "Xóa thành công" }`, but clients must not depend on a response body for status `204`

### Error

Errors use this shape:

```json
{
  "message": "..."
}
```

Typical status codes:

| Status | Meaning |
|---|---|
| `200` | Successful read or update |
| `201` | Resource created |
| `204` | Resource deleted; do not parse a response body |
| `400` | Invalid ID or invalid request data |
| `500` | Server/database failure while listing resources |

For `400` responses, the message is currently generic. The frontend should display a safe fallback rather than depend on the exact Vietnamese text.

## 3. Data models

### Author

| Field | Type | Required | Notes |
|---|---|---:|---|
| `_id` | string | response | MongoDB ObjectId |
| `name` | string | create | Author name |
| `bio` | string | no | Biography |
| `nationality` | string | no | Nationality |
| `birthYear` | number | no | Birth year |
| `createdAt` | string | response | ISO date-time |
| `updatedAt` | string | response | ISO date-time |
| `__v` | number | response | Mongoose version key; do not use for UI logic |

Example:

```json
{
  "_id": "66ac0f1a7b0d3e0f2c3a1111",
  "name": "Oliver Napoleon Hill",
  "bio": "Author and motivational speaker.",
  "nationality": "American",
  "birthYear": 1883,
  "createdAt": "2026-08-20T10:00:00.000Z",
  "updatedAt": "2026-08-20T10:00:00.000Z",
  "__v": 0
}
```

### Book

| Field | Type | Required | Notes |
|---|---|---:|---|
| `_id` | string | response | MongoDB ObjectId |
| `title` | string | create | Book title |
| `description` | string | no | Description |
| `price` | number | no | Must be greater than or equal to `0` |
| `publishedYear` | number | no | Must not be later than the server's current year |
| `genre` | string | no | Genre/category |
| `author` | string/object | create; response | Send an author ObjectId. Book list/detail responses populate it as an Author object |
| `createdAt` | string | response | ISO date-time |
| `updatedAt` | string | response | ISO date-time |
| `__v` | number | response | Mongoose version key; do not use for UI logic |

Create/update request example:

```json
{
  "title": "Think and Grow Rich",
  "description": "A book about personal success.",
  "price": 111,
  "publishedYear": 1937,
  "genre": "Business",
  "author": "66ac0f1a7b0d3e0f2c3a1111"
}
```

Book response example (author populated):

```json
{
  "_id": "66ac0f1a7b0d3e0f2c3a2222",
  "title": "Think and Grow Rich",
  "description": "A book about personal success.",
  "price": 111,
  "publishedYear": 1937,
  "genre": "Business",
  "author": {
    "_id": "66ac0f1a7b0d3e0f2c3a1111",
    "name": "Oliver Napoleon Hill",
    "bio": "Author and motivational speaker.",
    "nationality": "American",
    "birthYear": 1883,
    "createdAt": "2026-08-20T10:00:00.000Z",
    "updatedAt": "2026-08-20T10:00:00.000Z",
    "__v": 0
  },
  "createdAt": "2026-08-20T10:00:00.000Z",
  "updatedAt": "2026-08-20T10:00:00.000Z",
  "__v": 0
}
```

## 4. Author endpoints

### Create author

`POST /api/authors/create`

Request body:

```json
{
  "name": "Le Anh",
  "bio": "Biography",
  "nationality": "Vietnamese",
  "birthYear": 1996
}
```

Response: `201`, an Author object.

### List authors

`GET /api/authors`

No query parameters are currently supported.

Response: `200`, `Author[]`.

### Get author detail

`GET /api/authors/:id`

Response: `200`, an Author object.

### Update author

`PUT /api/authors/:id`

Send any fields to update. The route is implemented with `findByIdAndUpdate`; the response is the updated Author object.

```json
{
  "name": "Updated name",
  "bio": "Updated biography",
  "nationality": "Vietnamese",
  "birthYear": 1996
}
```

Response: `200`, an Author object.

### Delete author

`DELETE /api/authors/:id`

Response: `204 No Content`.

## 5. Book endpoints

### Create book

`POST /api/books/create`

`title` and `author` are required. `author` must be an existing author ObjectId.

Response: `201`, a Book object. The create response may contain `author` as an ObjectId string because create does not populate the relation.

### List books

`GET /api/books`

Optional query parameters:

| Parameter | Type | Behavior |
|---|---|---|
| `genre` | string | Exact, case-sensitive genre filter |
| `search` | string | Case-insensitive substring search against `title` |

Examples:

```text
GET /api/books
GET /api/books?genre=Business
GET /api/books?search=think%20and%20grow
GET /api/books?genre=Business&search=think
```

Response: `200`, a Book array with `author` populated.

### Get book detail

`GET /api/books/:id`

Response: `200`, a Book object with `author` populated.

### Update book

`PUT /api/books/:id`

Send one or more fields to update. The response is the updated Book object. The current implementation does not repopulate `author` for this response, so clients should accept either an author ObjectId string or an Author object after an update.

```json
{
  "title": "Updated title",
  "price": 130,
  "genre": "Skills",
  "author": "66ac0f1a7b0d3e0f2c3a1111"
}
```

Response: `200`, a Book object.

### Delete book

`DELETE /api/books/:id`

Response: `204 No Content`.

## 6. Frontend implementation notes

- URL-encode query values, especially `search` and `genre`.
- Treat `author` as a union in book state: `string | Author`; normalize it in the frontend if needed.
- Do not call `response.json()` for a `204` response.
- Check `response.ok` and parse `{ message }` for non-`204` errors.
- A missing resource, malformed ObjectId, invalid required field, or invalid author reference may all be reported as `400` by the current controllers.
- There is no pagination, sorting, authentication, CORS configuration, or standardized validation-error format in the current API.

Minimal fetch helper:

```js
async function request(path, options = {}) {
  const response = await fetch(`http://localhost:3001${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (response.status === 204) return null;

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.message || 'Request failed');
  }
  return payload;
}
```

## 7. Development URLs

When the server is running locally:

- API root: `http://localhost:3001`
- Swagger UI: `http://localhost:3001/api-docs`
- Swagger JSON: `http://localhost:3001/swagger.json`

The port can be changed with the `PORT` environment variable.
