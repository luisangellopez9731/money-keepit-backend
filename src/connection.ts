import * as path from "path";
import {
  getConnectionOptions,
  getConnectionManager,
  createConnection as typeormCreateConnection,
} from "typeorm";

export const createConnection = async () => {
  try {
    const defaultConnection = getConnectionManager().get();
    return defaultConnection;
  } catch (err) {}

  const defaultOptions = await getConnectionOptions();

  const entities = [path.join(__dirname, "./**/*entity.ts")];
  const migrations = [path.join(__dirname, "./migration/**/*.ts")];
  const subscribers = [path.join(__dirname, "./subscriber/**/*.ts")];

  const baseOptions = {
    entities,
    migrations,
    subscribers,
    synchronize: true,
    dropSchema: true,
    logging: false,
    migrationsRun: true,
  };
  return await typeormCreateConnection(
    Object.assign(defaultOptions, { ...baseOptions })
  );
};
