import { connection } from "connection";

jest.useRealTimers();
jest.setTimeout(600000);
beforeAll(() => {
  console.log("before all");
  return connection.create({ database: "money-keepit_test" });
});

afterAll(() => {
  return connection.close().then();
});

beforeEach(() => {
  return connection.clear().then();
});
