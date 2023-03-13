import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import Pokemon from "../../../database/models/UserPokemon.js";
import statusCodes from "../../utils/statusCodes.js";

const {
  success: { okCode },
  serverError: { internalServer },
} = statusCodes;

const getPokemon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pokemon = await Pokemon.find().exec();
    if (pokemon.length === 0) {
      throw new CustomError(
        "There are no Pokemon on the database",
        internalServer,
        "Coudln't retreive Pokémon"
      );
    }

    res.status(okCode).json({ pokemon });
  } catch (error: unknown) {
    const getPokemonError = new CustomError(
      (error as Error).message,
      internalServer,
      "Couldn't retreive Pokémon"
    );

    next(getPokemonError);
  }
};

export default getPokemon;
