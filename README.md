# Playstore Backend

## Overview

Welcome! This is a RESTful API for a Playstore-like platform, built with Node.js, Express, Prisma, and JWT authentication. It supports users, games, reviews, comments, and categories. The backend is designed for easy integration with modern frontends and API gateways.

---

## What's New / Key Changes

- **Games Endpoint:**  
  `GET /api/v1/games` now always returns a fixed set of 9 default games (see below), regardless of what is in the database. This ensures a consistent experience for the frontend and demo.
- **Database:**  
  All create/update/delete operations for games, users, reviews, and comments use Prisma and a PostgreSQL database.
- **Validation:**  
  All POST/PUT endpoints use Joi for strong request validation.
- **Error Handling:**  
  All errors are returned in a consistent, human-friendly format.
- **Authentication:**  
  JWT-based authentication is required for protected endpoints.  
  Pass your token as `Authorization: Bearer <token>`.
- **Project Structure:**  
  Clean separation of controllers, middleware, routes, models, and utilities.
- **Middleware:**  
  Includes logging, error handling, validation, and authentication middleware, each with clear comments for easy understanding.
- **Testing:**  
  The README now includes step-by-step instructions for testing every endpoint in Postman.

---

## API Versioning

All endpoints are prefixed with `/api/v1/`.

---

## Core Resources & Endpoints

### User

- `POST /api/v1/users/signup` - Register a new user
- `POST /api/v1/users/login` - Login user
- `GET /api/v1/users` - List all users (admin only)
- `GET /api/v1/users/:id` - Get user by ID (protected)
- `PUT /api/v1/users/:id` - Update user (protected)
- `DELETE /api/v1/users/:id` - Delete user (admin only)

### Game

- `GET /api/v1/games` - **Always returns 9 default games**
- `GET /api/v1/games/:id` - Get game by ID (from DB)
- `POST /api/v1/games` - Create game (protected, DB)
- `PUT /api/v1/games/:id` - Update game (protected, DB)
- `DELETE /api/v1/games/:id` - Delete game (protected, DB)

#### The 9 Default Games Returned by `/api/v1/games`:

| id | name                                | tags                                      | rating | category      |
|----|-------------------------------------|--------------------------------------------|--------|--------------|
| 1  | Mobile Legends: Bang Bang           | Action · Strategy · MOBA · Battling        | 4.0    | Action       |
| 2  | Super Bear Adventure                | Adventure · Action · Casual · Offline      | 4.4    | Adventure    |
| 3  | I Am Cat                            | Simulation · Life · Casual · Offline       | 4.4    | Simulation   |
| 4  | Block Blast!                        | Puzzle · Block · Casual · Offline          | 4.8    | Puzzle       |
| 5  | Craftsman: Building Craft           | Simulation · Sandbox · Single player       | 3.4    | Simulation   |
| 6  | PUBG MOBILE                         | Action · Tactical shooter · Multiplayer    | 4.4    | Action       |
| 7  | Game World: Life Story              | Educational · Simulation · Life · Casual   | 4.7    | Educational  |
| 8  | Hole.io                             | Arcade · Action · IO game · Casual         | 3.2    | Arcade       |
| 9  | Stickman Party 234 MiniGames        | Arcade · Board · Party · Casual            | 4.5    | Arcade       |

> **Note:** Any games you create via POST will not show up in the `/api/v1/games` GET endpoint, but are still stored in the database and accessible by ID.

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

---

## Validation

- All POST/PUT endpoints use Joi for request validation.
- Error responses follow this format:
  ```json
  {
    "error": {
      "code": 400,
      "message": "Validation error",
      "details": ["Field X is required"]
    }
  }
  ```

---

## Authentication

- JWT-based authentication for protected endpoints.
- Pass your token as `Authorization: Bearer <token>`.

---

## Project Structure

- `controllers/` - Handles HTTP requests and responses.
- `services/` - Business logic and database access (Prisma).
- `routes/` - API endpoint definitions.
- `middleware/` - Request validation, logging, error handling, authentication.
- `models/` - TypeScript interfaces and Prisma schema.
- `utils/` - Utility functions (error formatting, token helpers, etc.).

---

## Error Handling

- All errors are handled by a central error handler and follow a consistent, human-friendly format.

---

## API Gateway Integration

- The backend is ready for API gateway integration (e.g., AWS API Gateway, Kong).
- Add gateway middleware at the entry point if needed.

---

## Code Style

- ESLint and Prettier are used for code quality and formatting.
- See `.eslintrc.js` and `.prettierrc` for configuration.

---

## Example Request

```bash
curl -X POST http://localhost:4000/api/v1/users/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"secret123"}'
```

---

## How to Test All Endpoints in Postman

### 1. Start Your Backend Server

- Run `npm run dev` in your terminal.
- Make sure you see `Server running at http://localhost:4000`.

---

### 2. For Each Endpoint, Create a Request

#### Example: User Signup

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

#### Example: User Login

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

#### Example: Create Game (Protected)

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

#### Example: Get All Games

- **Method:** GET
- **URL:** `http://localhost:4000/api/v1/games`
- **Click Send.**
- **Expected:** Status 200, response contains the 9 default games.

#### Example: Update Game (Protected)

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

#### Example: Delete Game (Protected)

- **Method:** DELETE
- **URL:** `http://localhost:4000/api/v1/games/1`
- **Headers:** (as above)
- **Click Send.**
- **Expected:** Status 204 (No Content).

#### Example: Create Review (Protected)

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

#### Example: Get Reviews for a Game

- **Method:** GET
- **URL:** `http://localhost:4000/api/v1/reviews/game/2`
- **Click Send.**
- **Expected:** Status 200, response contains reviews for game 2.

#### Example: Create Comment (Protected)

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

#### Example: Get Comments for a Game

- **Method:** GET
- **URL:** `http://localhost:4000/api/v1/comments/game/2`
- **Click Send.**
- **Expected:** Status 200, response contains comments for game 2.

---

### 3. Test Error Handling and Validation

- Try sending invalid data (e.g., missing required fields, invalid types).
- Try accessing protected endpoints without a token.
- Try using an invalid token.
- Try updating/deleting resources you don't own (should get 403 Forbidden).

---

### 4. Repeat for All Endpoints

- Follow the same process for categories, users, reviews, comments, etc.
- Refer to the endpoint list above for all available routes.

---
