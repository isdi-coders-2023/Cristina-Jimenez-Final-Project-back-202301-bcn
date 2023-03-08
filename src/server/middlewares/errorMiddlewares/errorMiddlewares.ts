import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import { CustomError } from "../../../CustomError/CustomError.js";
import { ValidationError } from "express-validation";

export const debug = createDebug("pokedex:server:middlewares:errorMiddleware");

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const notFoundError = new CustomError(
    "Wrong endpoint",
    404,
    "Endpoint not found"
  );

  next(notFoundError);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    const validationErrors = error?.details?.body
      ?.map((joiError) => joiError.message)
      .join(" & ");

    debug(validationErrors);

    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  debug(error.message);

  res
    .status(error.statusCode || 500)
    .json({ error: error.publicMessage || "Something went wrong :(" });
};
