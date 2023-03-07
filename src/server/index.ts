import express from "express";
import morgan from "morgan";
import cors from "cors";
import pongController from "./controllers/pongController/pongController.js";

export const app = express();

app.disable("x-powered-by");

const allowedOrigins = [
  process.env.CORS_ALLOWED_LOCAL!,
  process.env.CORS_ALLOWED_PRODUCTION!,
];

const corsOptions: cors.CorsOptions = { origin: allowedOrigins };

app.use(cors(corsOptions));
app.use(morgan("dev"));

app.get("/pong", pongController);
