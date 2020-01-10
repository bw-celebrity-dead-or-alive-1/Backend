const request = require('supertest');

const server = require('../server.js')
const db = require('../data/dbConfig');
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
    expect(res.body).toEqual({
      api:
        "API is working. Celebrities will Shine like Stars Here, Unless Extinguished Already!"
    });
  });
});

describe("server", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should set db environment to testing", function() {
    expect(process.env.DB_ENV).toBe("testing");
  })
})

describe("POST /users/login", () => {
    it("should return 404 status for wrong user", async () => {
      const res = await request(server)
        .post("/users/login")
        .send({
          username: "lizdoyle",
          password: "password",
          firstName: "ELizabeth",
          lastName: "Doyle",
          email: "lizdoyle@gmail.com",
          role: "user"
        })
        .set("Content-Type", "application/json");
      expect(res.status).toBe(404);
      expect(res.body.message).toBe(
        "Credentials Error. Please verify the provided username and password!"
      );
    })

      it("should return 201 status", async () => {
        const password = bcrypt.hashSync("pass", 12);
        await db("users").insert([{ username: "lizdoyle", password, firstName: "Elizabeth",  lastName: "Doyle",  email: "lizdoyle@gmail.com" }]);
        const res = await request(server)
          .post("/api/auth/login")
          .send({
            username: "lizdoyle",
            password: "pass",
            firstName: "Elizabeth",
            lastName: "Doyle",
            email: "lizdoyle@gmail.com",
            role: "user"
          })
          .set("Content-Type", "application/json");
        expect(res.status).toBe(404);
      }, 10000);
    })