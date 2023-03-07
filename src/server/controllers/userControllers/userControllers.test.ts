import { type Response, type NextFunction, type Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../../../database/models/User";
import { type UserLoginCredentials } from "../../types";
import { CustomError } from "../../../CustomError/CustomError";
import { loginUser } from "./userControllers";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const req: Partial<
  Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserLoginCredentials
  >
> = {};
const next = jest.fn() as NextFunction;

beforeEach(() => jest.clearAllMocks());

describe("Given a loginUser controller", () => {
  const mockUserLoginCredentials: UserLoginCredentials = {
    username: "rasputin",
    password: "rasputin11",
  };

  describe("When it receives a request with a username 'rasputin' and password 'rasputin11' and the user is not registered in the database", () => {
    test("Then it should call its next method with a status 401 and the messages 'Wrong username' and 'Wrong credentials'", async () => {
      const expectedError = new CustomError(
        "Wrong username",
        401,
        "Wrong credentials"
      );
      req.body = mockUserLoginCredentials;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(undefined),
      }));

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserLoginCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with a username 'rasputin' and password 'rasputin11' and the user is registered in the database but the passwords don't match", () => {
    test("Then it should call its next method with a status 401 and the messages 'Wrong password' and 'Wrong credentials'", async () => {
      const expectedError = new CustomError(
        "Wrong password",
        401,
        "Wrong credentials"
      );
      req.body = mockUserLoginCredentials;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...mockUserLoginCredentials,
          _id: new mongoose.Types.ObjectId(),
        }),
      }));

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserLoginCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with username `rasputin` and password `rasputin11` and the user is registered in the database", () => {
    const expectedToken = "mocken";
    const expectedResponseBody = { token: expectedToken };

    test("Then it should call its status method with 200", async () => {
      const expectedStatusCode = 200;
      req.body = mockUserLoginCredentials;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...mockUserLoginCredentials,
          _id: new mongoose.Types.ObjectId(),
        }),
      }));
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(expectedToken);

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserLoginCredentials
        >,
        res as Response,
        next
      );
      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with a token", async () => {
      req.body = mockUserLoginCredentials;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...mockUserLoginCredentials,
          _id: new mongoose.Types.ObjectId(),
        }),
      }));
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(expectedToken);

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserLoginCredentials
        >,
        res as Response,
        next
      );

      expect(res.json).toHaveBeenCalledWith(expectedResponseBody);
    });
  });
});
