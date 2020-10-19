const reviewRequested = require("./review-requested-team.json");
const app = require("./app");
const request = require("supertest");

it("responds with hi world", () => 
  request(app)
    .post("/github-webhook")
    .send(reviewRequested)
    .expect("Content-Type", /html/)
    .expect("Content-Length", "8")
    .expect(200)
    .then(response => expect(response.text).toEqual('hi world'))
);
