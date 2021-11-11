import supertest from "supertest";

import { AccountController } from "./Account.controller";

describe("should init", () => {
  it("asda", async () => {
    const res = await supertest(new AccountController().router()).get(
      "/accounts"
    );
    expect(res.status).toBe(200);
  });
});
