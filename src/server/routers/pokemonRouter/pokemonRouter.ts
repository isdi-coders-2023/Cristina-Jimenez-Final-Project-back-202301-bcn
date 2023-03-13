import { Router } from "express";
import getPokemon from "../../controllers/pokemonControllers/pokemonControllers.js";

export const pokemonRouter = Router();

pokemonRouter.get("/", getPokemon);
