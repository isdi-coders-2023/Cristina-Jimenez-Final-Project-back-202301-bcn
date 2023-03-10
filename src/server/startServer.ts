import createDebug from "debug";
import { type CustomError } from "../CustomError/CustomError.js";
import { app } from "./index.js";

const debug = createDebug("pokedex:server:");

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
    });

    server.on("error", (error: CustomError) => {
      if (error.code === "EADDRINUSE") {
        debug(`The port number ${port} is already in use`);
      }

      reject(error);
    });
  });

export default startServer;
