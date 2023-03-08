import express from "express";
import morgan from "morgan";
import cors from "cors";
import pongController from "./controllers/pongController/pongController.js";
import usersRouter from "./routers/usersRouter/usersRouter.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import { paths } from "./paths/paths.js";

const {
  users: { path },
} = paths;

export const app = express();

app.disable("x-powered-by");

const allowedOrigins = [
  process.env.CORS_ALLOWED_LOCAL!,
  process.env.CORS_ALLOWED_PRODUCTION!,
];

const corsOptions: cors.CorsOptions = { origin: allowedOrigins };

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use(path, usersRouter);

app.get("/pong", pongController);

app.use(notFoundError);
app.use(generalError);
