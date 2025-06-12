# Playstore Backend

## API Versioning
All endpoints are prefixed with `/api/v1/`.

## Core Resources
- User
- Game
- Review
- Comment
- Category

## Endpoints
### User
- `POST /api/v1/users/signup`  
  Request: `{ "email": "user@example.com", "password": "secret123" }`  
  Response: `{ "token": "...", "user": { "id": 1, "email": "user@example.com" } }`

- `POST /api/v1/users/login`  
  Request: `{ "email": "user@example.com", "password": "secret123" }`  
  Response: `{ "token": "...", "user": { "id": 1, "email": "user@example.com" } }`

### Game
- `GET /api/v1/games`
- `GET /api/v1/games/:id`
- `POST /api/v1/games` (protected, requires JWT)
- `PUT /api/v1/games/:id` (protected, requires JWT)
- `DELETE /api/v1/games/:id` (protected, requires JWT)

### Category
- `GET /api/v1/categories`
- `GET /api/v1/categories/:id`
- `POST /api/v1/categories`
- `PUT /api/v1/categories/:id`
- `DELETE /api/v1/categories/:id`

### Review
- `POST /api/v1/reviews`
- `GET /api/v1/reviews/game/:gameId`
- `GET /api/v1/reviews/stats/:gameId`

### Comment
- `POST /api/v1/comments`
- `GET /api/v1/comments/game/:gameId`


## Validation
- All POST/PUT endpoints use Joi validation.
- Error responses follow the format:
  ```json
  {
    "error": {
      "code": 400,
      "message": "Validation error",
      "details": ["Field X is required"]
    }
  }
  ```

## Authentication
- JWT-based authentication for protected endpoints.
- Pass token as `Authorization: Bearer <token>`.

## Project Structure
- `controllers/` - HTTP request handlers
- `services/` - Business logic
- `routes/` - API endpoints
- `middleware/` - Request processing (validation, logging, error handling)
- `models/` - Prisma schema

## Error Handling
- All errors are handled by a central error handler and follow a consistent format.

## Example Request
```bash
curl -X POST http://localhost:4000/api/v1/users/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"secret123"}'
```

## Design Decisions
- RESTful API with clear resource separation.
- API versioning via URL.
- Joi for validation.
- JWT for authentication.
- Centralized error handling.
