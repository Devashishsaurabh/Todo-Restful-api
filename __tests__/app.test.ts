const request = require("supertest");
import app from "../index"
describe("GET /todo/directory/list ", () => {
    test("It should respond /directory/list", async () => {
      const response = await request(app).get("/todo/directory/list");
      expect(response.statusCode).toBe(200);
    });
});