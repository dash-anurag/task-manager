const request = require("supertest");

const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
  name: "Mike",
  email: "mike@example.com",
  password: "56What!!!",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Anurag Dash",
      email: "random@gmail.com",
      password: "default2000",
    })
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should not login non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "wrong1234",
    })
    .expect(400);
});
