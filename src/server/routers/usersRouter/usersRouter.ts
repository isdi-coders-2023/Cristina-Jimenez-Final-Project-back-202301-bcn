import { Router } from "express";
import { validate } from "express-validation";
import { loginUser } from "../../controllers/userControllers/userControllers.js";
import { paths } from "../../paths/paths.js";
import loginUserSchema from "../../schemas/loginUserSchema.js";

const {
  users: {
    endpoints: { login },
  },
} = paths;

const usersRouter = Router();

usersRouter.post(
  login,
  validate(loginUserSchema, {}, { abortEarly: false }),
  loginUser
);

export default usersRouter;
