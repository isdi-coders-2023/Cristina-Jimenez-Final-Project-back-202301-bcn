import { Router } from "express";
import getPokemon from "../../controllers/pokemonControllers/pokemonControllers";
import { paths } from "../../paths/paths";

const {
  pokemon: { pokemonPath },
} = paths;

const pokemonRouter = Router();

pokemonRouter.get(pokemonPath, getPokemon);
