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
  if (Object.keys(options).length == 0) {
    try {
      const defaultConnection = getConnectionManager().get();
      return defaultConnection;
    } catch (err) {}
  }

  const defaultOptions = await getConnectionOptions();
  const entities = [path.join(__dirname, "./**/*entity.ts")];
  const migrations = [path.join(__dirname, "./migrations/**/*.ts")];
  const subscribers = [path.join(__dirname, "./subscriber/**/*.ts")];

  const baseOptions = {
    type: "postgres",
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

export async function getTenantConnection(tenantId: string) {
  const connectionName = `tenant_${tenantId}`;
  let connection = null;
  try {
    connection = getConnectionManager().get(`tenant_${tenantId}`);
  } catch (err) {}

  if (connection == null) {
    try {
      connection = await createConnection({
        name: connectionName,
        schema: `${tenantId}_workspace`,
      });
    } catch (err) {
      throw new Error(`workspace with name ${tenantId} doesn't exists`);
    }
  }

  return connection;
}
