import { createConnection, TEST_CONNECTION_DB } from "connection";
import { getConnection } from "typeorm";

jest.useRealTimers();
jest.setTimeout(600000);
beforeAll(() => {
  return createConnection({ database: TEST_CONNECTION_DB });
});

afterAll(async () => {
  const connection = getConnection();
  return await connection.close();
});

beforeEach(async () => {
  const connection = getConnection();
  const entities = connection.entityMetadatas;

  entities.forEach(async (entity) => {
    const repository = connection.getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.tableName}`);
  });
});
