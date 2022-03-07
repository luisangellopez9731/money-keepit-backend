import { createConnection, TEST_CONNECTION_DB } from "connection";
import { getConnection } from "typeorm";

jest.useRealTimers();
jest.setTimeout(600000);
beforeAll((done) => {
  console.log("before all");
  createConnection({
    name: TEST_CONNECTION_DB,
    database: TEST_CONNECTION_DB,
    extra: {
      insecureAuth: true,
    },
  }).then((res) => {
    console.log(res);
    done();
  }).catch(err => {
    console.error(err)
    done();
  });
});

afterAll(async () => {
  const connection = getConnection(TEST_CONNECTION_DB);
  return await connection.close();
});

beforeEach(async () => {
  const connection = getConnection(TEST_CONNECTION_DB);
  const entities = connection.entityMetadatas;

  entities.forEach(async (entity) => {
    const repository = connection.getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.tableName}`);
  });
});
