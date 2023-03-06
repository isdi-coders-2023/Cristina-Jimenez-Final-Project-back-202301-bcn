import "./loadEnviroment.js";
import chalk from "chalk";
import createDebug from "debug";
import startServer from "./server/startServer.js";

const port = process.env.PORT ?? 4321;

export const debug = createDebug("pokedex:");

try {
  await startServer(+port);
  debug(chalk.green(`Server listening on port ${chalk.yellowBright(port)}`));
} catch (error: unknown) {
  debug((error as Error).message);
}
