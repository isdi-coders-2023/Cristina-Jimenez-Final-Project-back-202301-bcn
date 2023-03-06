import { type Request, type Response } from "express";

const pong = (req: Request, res: Response) => {
  res.status(200).json({ pong: "pong!" });
};

export default pong;
