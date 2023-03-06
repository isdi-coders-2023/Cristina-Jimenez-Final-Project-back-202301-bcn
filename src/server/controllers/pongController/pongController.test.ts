import { type Request, type Response } from "express";
import pong from "./pongController";

const mockRes: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const mockReq = {};
const expectedStatusCode = 200;

beforeEach(() => jest.clearAllMocks());

describe("Given the pongController controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method with 200", () => {
      pong(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  test("Then it should call its json method with message 'pong!'", () => {
    const expectedMessage = "pong!";
    pong(mockReq as Request, mockRes as Response);

    expect(mockRes.json).toHaveBeenCalledWith({ pong: expectedMessage });
  });
});
