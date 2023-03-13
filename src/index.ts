import "./loadEnvironment.js";
import chalk from "chalk";
import createDebug from "debug";
import startServer from "./server/startServer.js";
import connectDatabase from "./database/connectDatabase.js";

const port = process.env.PORT ?? 4321;
const mongoDbUrl = process.env.MONGODB_CONNECTION_URL!;

export const debug = createDebug("pokedex:");

try {
  await connectDatabase(mongoDbUrl);
  debug(chalk.cyanBright("Connected to database"));

  await startServer(+port);
  debug(chalk.green(`Server listening on port ${chalk.yellowBright(port)}`));
} catch (error: unknown) {
  debug(`${(error as Error).message}`);
}
