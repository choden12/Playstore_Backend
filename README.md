# Playstore Backend

## Overview
A RESTful API for a Playstore-like platform, supporting users, games, reviews, comments, and categories. Built with Node.js, Express, Prisma, and JWT authentication.

## API Versioning
All endpoints are prefixed with `/api/v1/`.

## Core Resources & Endpoints

### User
- `GET /api/v1/users` - List all users (protected, admin)
- `GET /api/v1/users/:id` - Get user by ID (protected)
- `POST /api/v1/users/signup` - Register new user
- `POST /api/v1/users/login` - Login user
- `PUT /api/v1/users/:id` - Update user (protected)
- `DELETE /api/v1/users/:id` - Delete user (protected, admin)

### Game
- `GET /api/v1/games` - List all games (supports filtering/query params)
- `GET /api/v1/games/:id` - Get game by ID
- `POST /api/v1/games` - Create game (protected)
- `PUT /api/v1/games/:id` - Update game (protected)
- `DELETE /api/v1/games/:id` - Delete game (protected)

### Category
- `GET /api/v1/categories` - List all categories
- `GET /api/v1/categories/:id` - Get category by ID
- `POST /api/v1/categories` - Create category (protected)
- `PUT /api/v1/categories/:id` - Update category (protected)
- `DELETE /api/v1/categories/:id` - Delete category (protected)

### Review
- `GET /api/v1/reviews` - List all reviews (supports filtering)
- `GET /api/v1/reviews/:id` - Get review by ID
- `GET /api/v1/reviews/game/:gameId` - Reviews for a game
- `GET /api/v1/reviews/stats/:gameId` - Review stats for a game
- `POST /api/v1/reviews` - Create review (protected)
- `PUT /api/v1/reviews/:id` - Update review (protected)
- `DELETE /api/v1/reviews/:id` - Delete review (protected)

### Comment
- `GET /api/v1/comments` - List all comments (supports filtering)
- `GET /api/v1/comments/:id` - Get comment by ID
- `GET /api/v1/comments/game/:gameId` - Comments for a game
- `POST /api/v1/comments` - Create comment (protected)
- `PUT /api/v1/comments/:id` - Update comment (protected)
- `DELETE /api/v1/comments/:id` - Delete comment (protected)

## Validation
- All POST/PUT endpoints use Joi validation for body and query parameters.
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
- `services/` - Business logic and data access (Prisma)
- `routes/` - API endpoints
- `middleware/` - Request processing (validation, logging, error handling, authentication)
- `models/` - Prisma schema
- `utils/` - Utility functions (e.g., error formatting, token helpers)

## Error Handling
- All errors are handled by a central error handler and follow a consistent format.

## API Gateway Integration
- The backend is designed to be compatible with API gateways (e.g., AWS API Gateway, Kong).
- Add gateway middleware at the entry point if needed.

## Code Style
- ESLint and Prettier are used for code quality and formatting.
- See `.eslintrc.js` and `.prettierrc` for configuration.

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
- Prisma for database access.
- API gateway ready.

## Development
- Run `npm run lint` to check code style.
- Run `npm run format` to auto-format code.

## License
MIT
