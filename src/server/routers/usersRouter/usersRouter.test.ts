import mongoose from "mongoose";
import request from "supertest";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDatabase from "../../../database/connectDatabase";
import User from "../../../database/models/User";
import { type UserStructure, type UserLoginCredentials } from "../../types";
import { app } from "../..";
import statusCodes from "../../statusCodes";

const userData: UserStructure = {
  username: "notDiana",
  password: "12345678",
  email: "notDiana@gmail.com",
};

const {
  success: { okCode },
  clientError: { unauthorized },
} = statusCodes;

let mockMongoDbServer: MongoMemoryServer;

beforeAll(async () => {
  mockMongoDbServer = await MongoMemoryServer.create();
  const mongodbServerUrl = mockMongoDbServer.getUri();

  await connectDatabase(mongodbServerUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mockMongoDbServer.stop();
});

beforeAll(async () => {
  await User.create(userData);
});

describe("Given the POST /users/login endpoint", () => {
  const userLoginCredentials: UserLoginCredentials = {
    username: "notDiana",
    password: "12345678",
  };

  describe("When it receives a request with a user with username 'notDiana' and password '12345678' and the user exists", () => {
    test("Then it should respond with status 200 and property token with value 'mocken'", async () => {
      const expectedToken = "mocken";
      const path = "/users/login";

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(expectedToken);

      const response = await request(app)
        .post(path)
        .send(userLoginCredentials)
        .expect(okCode);

      expect(response.body).toHaveProperty("token", expectedToken);
    });
  });

  describe("When it receives a request with a user with username 'notDiana' and password '12345678' and the user doesn't exists", () => {
    test("Then it should respond with status 401 and error: 'Wrong Credentials'", async () => {
      const expectedMessage = "Wrong credentials";
      const path = "/users/login";

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const response = await request(app)
        .post(path)
        .send(userLoginCredentials)
        .expect(unauthorized);

      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });
});
