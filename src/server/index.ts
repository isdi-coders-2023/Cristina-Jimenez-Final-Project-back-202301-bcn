import express from "express";
import morgan from "morgan";
import pongController from "./controllers/pongController/pongController.js";

export const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.get("/pong", pongController);
