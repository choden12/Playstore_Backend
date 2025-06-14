import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { logger } from "./middleware/logger";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import gameRoutes from "./routes/game.routes";
import reviewRoutes from "./routes/reviewRoutes";
import commentRoutes from "./routes/commentRoutes";

/**
 * Main Express application for Playstore Backend.
 * Handles API routing, middleware, and error handling.
 * @module app
 */
dotenv.config();
const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173"
    ],
    credentials: true,
  })
);

// Logger middleware
app.use(logger);

// API Gateway integration placeholder
// Example: app.use("/api", apiGatewayMiddleware);

// Mount user and game routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/games", gameRoutes);

// Mount review and comment routes
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/comments", commentRoutes);

// Mount other API routes
app.use("/api/v1", routes);

// Central error handler
app.use(errorHandler);

export default app;
