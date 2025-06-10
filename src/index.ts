import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./middleware/logger";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

// Load environment variables
dotenv.config();

const app = express();

// Middleware: Logging
app.use(logger);

// Middleware: Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware: CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"],
    credentials: true,
  })
);

// API Versioning (URL-based)
app.use("/api/v1", routes);

// Central Error Handler
app.use(errorHandler);

export default app;
