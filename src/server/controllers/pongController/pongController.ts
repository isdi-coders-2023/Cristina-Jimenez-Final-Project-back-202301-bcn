import { type Request, type Response } from "express";

const pongController = (req: Request, res: Response) => {
  res.status(200).json({ pong: "pong!" });
};

export default pongController;
