import * as path from "path";
import {
  createConnection,
  getConnection,
  getConnectionOptions,
  ConnectionOptions,
  getConnectionManager,
} from "typeorm";

export default class Connection {
  private static instance: Connection;
  public static getInstance() {
    if (!Connection.instance) {
      Connection.instance = new Connection();
    }

    return Connection.instance;
  }

  private constructor() {}
  async create(options?: Partial<ConnectionOptions>) {
    try {
      const defaultConnection = getConnectionManager().get();
      return defaultConnection;
    } catch (err) {}

    const defaultOptions = await getConnectionOptions();

    const entities = [path.join(__dirname, "./entity/**/*.ts")];
    const migrations = [path.join(__dirname, "./migration/**/*.ts")];
    const subscribers = [path.join(__dirname, "./subscriber/**/*.ts")];

    const systemOptions = {
      entities,
      migrations,
      subscribers,
      synchronize: true,
      dropSchema: true,
      logging: false,
      migrationsRun: true,
    };
    return await createConnection(
      Object.assign(defaultOptions, { ...systemOptions, ...options })
    );
  }

  get() {
    return getConnection();
  }

  async close() {
    await getConnection().close();
  }

  async clear() {
    const conn = getConnection();
    const entities = conn.entityMetadatas;

    await Promise.all(
      entities.map(async (entity) => {
        const repo = conn.getRepository(entity.name);
        return await repo.query(`DELETE FROM ${entity.tableName}`);
      })
    );
  }
}
