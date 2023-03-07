import { Router } from "express";
import { loginUser } from "../../controllers/userControllers/userControllers.js";
import { paths } from "../../paths/paths.js";

const {
  users: {
    endpoints: { login },
  },
} = paths;

const usersRouter = Router();

usersRouter.post(login, loginUser);

export default usersRouter;
