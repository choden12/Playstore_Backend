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

# How to Test All Endpoints in Postman

## 1. Start Your Backend Server
- Run `npm run dev` in your terminal.
- Make sure you see `Server running at http://localhost:4000`.

---

## 2. For Each Endpoint, Create a Request

### Example: User Signup

- **Method:** POST
- **URL:** `http://localhost:4000/api/v1/users/signup`
- **Body:** (Go to Body > raw > JSON)
  ```json
  {
    "email": "testuser@example.com",
    "password": "secret123"
  }
  ```
- **Headers:** `Content-Type: application/json`
- **Click Send.**
- **Expected:** Status 201, response contains a JWT token and user info.

---

### Example: User Login

- **Method:** POST
- **URL:** `http://localhost:4000/api/v1/users/login`
- **Body:**
  ```json
  {
    "email": "testuser@example.com",
    "password": "secret123"
  }
  ```
- **Click Send.**
- **Expected:** Status 200, response contains a JWT token and user info.

---

### Example: Create Game (Protected)

- **Method:** POST
- **URL:** `http://localhost:4000/api/v1/games`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer <your-jwt-token-from-login>`
- **Body:**
  ```json
  {
    "image": "/mlbb.png",
    "name": "Mobile Legends: Bang Bang",
    "tags": "Action · Strategy · MOBA · Battling",
    "rating": 4.0,
    "category": "Action"
  }
  ```
- **Click Send.**
- **Expected:** Status 201, response contains the created game.

---

### Example: Get All Games

- **Method:** GET
- **URL:** `http://localhost:4000/api/v1/games`
- **Click Send.**
- **Expected:** Status 200, response contains a list of games.

---

### Example: Update Game (Protected)

- **Method:** PUT
- **URL:** `http://localhost:4000/api/v1/games/1`
- **Headers:** (as above)
- **Body:**
  ```json
  {
    "image": "/mlbb.png",
    "name": "MLBB Updated",
    "tags": "Action · MOBA",
    "rating": 4.5,
    "category": "Action"
  }
  ```
- **Click Send.**
- **Expected:** Status 200, response contains the updated game.

---

### Example: Delete Game (Protected)

- **Method:** DELETE
- **URL:** `http://localhost:4000/api/v1/games/1`
- **Headers:** (as above)
- **Click Send.**
- **Expected:** Status 204 (No Content).

---

### Example: Create Review (Protected)

- **Method:** POST
- **URL:** `http://localhost:4000/api/v1/reviews`
- **Headers:** (as above)
- **Body:**
  ```json
  {
    "gameId": 2,
    "rating": 5,
    "text": "Awesome game!"
  }
  ```
- **Click Send.**
- **Expected:** Status 201, response contains the review.

---

### Example: Get Reviews for a Game

- **Method:** GET
- **URL:** `http://localhost:4000/api/v1/reviews/game/2`
- **Click Send.**
- **Expected:** Status 200, response contains reviews for game 2.

---

### Example: Create Comment (Protected)

- **Method:** POST
- **URL:** `http://localhost:4000/api/v1/comments`
- **Headers:** (as above)
- **Body:**
  ```json
  {
    "gameId": 2,
    "text": "Nice graphics!",
    "rating": 4
  }
  ```
- **Click Send.**
- **Expected:** Status 201, response contains the comment.

---

### Example: Get Comments for a Game

- **Method:** GET
- **URL:** `http://localhost:4000/api/v1/comments/game/2`
- **Click Send.**
- **Expected:** Status 200, response contains comments for game 2.

---

## 3. Test Error Handling and Validation

- Try sending invalid data (e.g., missing required fields, invalid types).
- Try accessing protected endpoints without a token.
- Try using an invalid token.
- Try updating/deleting resources you don't own (should get 403 Forbidden).

---

## 4. Repeat for All Endpoints

- Follow the same process for categories, users, reviews, comments, etc.
- Refer to the endpoint list in this README for all available routes.

---

## Summary Table

| Endpoint Example                  | Method | Auth Required | Body Example / Notes                |
|-----------------------------------|--------|--------------|-------------------------------------|
| /api/v1/users/signup              | POST   | No           | `{ "email": "...", "password": "..." }` |
| /api/v1/users/login               | POST   | No           | `{ "email": "...", "password": "..." }` |
| /api/v1/games                     | GET    | No           |                                     |
| /api/v1/games                     | POST   | Yes          | `{ "image": "...", "name": "...", ... }` |
| /api/v1/games/:id                 | PUT    | Yes          | `{ "image": "...", "name": "...", ... }` |
| /api/v1/games/:id                 | DELETE | Yes          |                                     |
| /api/v1/reviews                   | POST   | Yes          | `{ "gameId": 1, "rating": 5, "text": "..." }` |
| /api/v1/comments                  | POST   | Yes          | `{ "gameId": 1, "text": "...", "rating": 4 }` |

---

**Tip:**  
- Always use the JWT token from login/signup for protected endpoints.
- Use the correct HTTP method and body format as shown above.
- Check both success and error responses for each endpoint.