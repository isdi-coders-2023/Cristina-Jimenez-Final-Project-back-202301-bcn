import { type Request, type NextFunction, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import { generalError, notFoundError } from "./errorMiddlewares";

const mockRes: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const mockReq = {};
const mockNext: NextFunction = () => ({});
const statusCode = 500;
const mockError = new CustomError("Error", statusCode, "Error");

beforeEach(() => jest.clearAllMocks());

describe("Given a generalError middleware", () => {
  describe("When it receives an error and an error with status 500", () => {
    test("Then it should call its status method with 500", () => {
      generalError(
        mockError,
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call its json method with property error: 'Error'", () => {
      generalError(
        mockError,
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.json).toHaveBeenCalledWith({
        error: mockError.publicMessage,
      });
    });

    describe("When it receives an error with the public message 'Server internal error'", () => {
      test("Then it should respond with the error message 'Server internal error'", () => {
        const errorMessage = "Server internal error";
        const error = new CustomError("", 500, errorMessage);

        generalError(error, mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.json).toHaveBeenCalledWith({
          error: errorMessage,
        });
      });
    });

    describe("When it receives an error and an error with an invalid status code", () => {
      test("Then it should respond with status code 500", () => {
        const invalidStatusCode = NaN;
        const error = new CustomError("", invalidStatusCode, "");

        generalError(error, mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(500);
      });
    });

    describe("When it receives a response without a public message", () => {
      test("Then it should respond with the default error message 'Something went wrong'", () => {
        const error = new CustomError("", 500, "");
        const defaultErrorMessage = "Something went wrong :(";

        generalError(error, mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.json).toHaveBeenCalledWith({
          error: defaultErrorMessage,
        });
      });
    });
  });
});

describe("Given the notFoundError middlware", () => {
  describe("When it receives a request", () => {
    test("Then it should call the received next function with status code 404", () => {
      const mockNext = jest.fn();
      const statusCode = 404;

      notFoundError(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode })
      );
    });
  });
});
