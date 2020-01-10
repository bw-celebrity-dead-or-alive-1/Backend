const request = require('supertest');

const server = require('./server.js')
const db = require('./data/dbConfig');
const bcrypt = require('bcrypt');


describe("GET /", () => {
  it("should return 200 OK", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });

  // does it return the right data type?
  it("should be json", async () => {
    const res = await request(server).get("/");
    expect(res.type).toBe("application/json");
  });

  // does it return the right data?
  it("should return the right object", async () => {
    const res = await request(server).get("/");
    expect(res.body).toEqual({ api: "This is working!" });
  });
});

describe("server", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should set db environment to testing", function() {
    expect(process.env.DB_ENV).toBe("testing");
  });

