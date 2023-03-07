import { Router } from "express";
import { loginUser } from "../../controllers/userControllers/userControllers.js";
import usersRouterPaths from "./routes.js";

const { login } = usersRouterPaths;

const usersRouter = Router();

usersRouter.post(login, loginUser);

export default usersRouter;
