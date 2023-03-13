import { model, Schema } from "mongoose";

const userPokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 12,
  },
  types: { type: [String], required: true },
  ability: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  baseExp: {
    type: Number,
    required: true,
  },
});

const Pokemon = model("Pokemon", userPokemonSchema, "Pokemon");

export default Pokemon;
