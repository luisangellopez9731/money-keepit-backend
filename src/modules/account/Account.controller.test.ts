import supertest from "supertest";

import { AccountController } from "./Account.controller";

describe("should init", () => {
  it("asda", async () => {
    return supertest(new AccountController().router()).get(
      "/accounts"
    ).expect(200);
  });
});
