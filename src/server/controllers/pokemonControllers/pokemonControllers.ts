import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import Pokemon from "../../../database/models/Pokemon";
import statusCodes from "../../utils/statusCodes";

const {
  success: { okCode },
  serverError: { internalServer },
} = statusCodes;

const getPokemon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pokemon = await Pokemon.find().exec();

    res.status(okCode).json({ pokemon });
  } catch (error: unknown) {
    const getPokemonError = new CustomError(
      (error as Error).message,
      internalServer,
      "Couldn't retreive Pokemon"
    );
    next(getPokemonError);
  }
};

export default getPokemon;
