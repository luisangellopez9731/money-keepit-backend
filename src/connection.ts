import * as path from "path";
import {
  ConnectionOptions,
  getConnectionOptions,
  getConnectionManager,
  createConnection as typeormCreateConnection,
} from "typeorm";

export const TEST_CONNECTION_DB = "moneyKeepitTest";

export const createConnection = async (
  options: Partial<ConnectionOptions> = {}
) => {
  try {
    const defaultConnection = getConnectionManager().get();
    return defaultConnection;
  } catch (err) {}

  const defaultOptions = await getConnectionOptions();
  const entities = [path.join(__dirname, "./**/*entity.ts")];
  const migrations = [path.join(__dirname, "./migrations/**/*.ts")];
  const subscribers = [path.join(__dirname, "./subscriber/**/*.ts")];

  const baseOptions = {
    entities,
    migrations,
    subscribers,
    synchronize: true,
    dropSchema: false,
    logging: false,
    migrationsRun: true,
  };
  return await typeormCreateConnection(
    Object.assign(defaultOptions, { ...baseOptions }, { ...options })
  );
};
