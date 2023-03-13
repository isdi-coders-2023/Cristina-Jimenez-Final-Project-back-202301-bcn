import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import Pokemon from "../../../database/models/Pokemon";
import statusCodes from "../../utils/statusCodes";
import getPokemon from "./pokemonControllers";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const req: Partial<Request> = {};
const next: NextFunction = jest.fn();

const {
  success: { okCode },
  serverError: { internalServer },
} = statusCodes;

beforeEach(() => jest.clearAllMocks());

describe("Given the pokemon controller", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status code 200", async () => {
      Pokemon.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({}),
      }));

      await getPokemon(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(okCode);
    });

    test("Then it should respond with property pokemon assigned to an empty object", async () => {
      const expectedEmptyObject = { pokemon: {} };

      Pokemon.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({}),
      }));

      await getPokemon(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedEmptyObject);
    });
  });

  describe("when there's an error when getting Pokemon from the database", () => {
    test("Then it should call the function Next with the expected error", async () => {
      const expectedError = new CustomError(
        "Couldn't retreive Pokemon",
        internalServer,
        "Couldn't retreive Pokemon"
      );

      Pokemon.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockRejectedValue(expectedError),
      }));

      await getPokemon(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
