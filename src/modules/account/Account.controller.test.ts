import supertest from "supertest";

import { TEST_CONNECTION_DB } from "connection";
import { AccountController } from "./Account.controller";

describe("should init", () => {
  it("asda", async () => {
    console.log(TEST_CONNECTION_DB);
    // return supertest(new AccountController(TEST_CONNECTION_DB).router())
    //   .get("/accounts")
    //   .expect(200);
  });
});
