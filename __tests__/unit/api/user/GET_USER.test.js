const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

const app = require("../../../../index");

const Axios = require("axios");

chai.use(chaiHttp);

it(`it should be connected with port ${process.env.PORT}`, async () => {
  const port = app.get("PORT");

  expect(port).to.be.eq(process.env.PORT);
});

it(`it should be connected to internet `, async () => {
  Axios.get("www.");
});

it("it should return the object with the requested output", async () => {
  const { body } = await chai.request(app).get("/api");

  expect(body).to.be.an("object");

  expect(body).to.have.property("websites");
  expect(body.websites).to.be.an("array");

  expect(body).to.have.property("usersOrdered");
  expect(body.usersOrdered).to.be.an("array");
  expect(body.usersOrdered).to.have.property("name");
  expect(body.usersOrdered.name).to.be.an("string");
  expect(body.usersOrdered).to.have.property("email");
  expect(body.usersOrdered.email).to.be.an("string");
  expect(body.usersOrdered).to.have.property("company");
  expect(body.usersOrdered.company).to.be.an("string");

  expect(body).to.have.property("usersFiltered");
  expect(body.usersFiltered).to.be.an("array");
}).timeout(10000);
