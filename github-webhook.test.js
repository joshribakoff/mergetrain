const reviewRequested = require("./review-requested-team.json");
const app = require("./app");
const request = require("supertest");

it("rejects invalid key", () =>
  request(app)
  .post("/github-webhook")
  .set("x-hub-signature-256", 'invalid')
    .send(reviewRequested)
    .expect("Content-Type", /html/)
    .expect(403)
    .then((response) => expect(response.text).toEqual("not authorized")));

it("validates the key", () => {
//   const secret = "oeuoeu";
  return request(app)
  .post("/github-webhook")
  .set("x-hub-signature-256", "sha256=bbdf8a7661ca64d0302dd6f22833b999c93cb61bd1080ae74183d0b9077c170e")
    .send(reviewRequested)
    .expect("Content-Type", /html/)
    .expect(200)
    .then((response) => expect(response.text).toEqual("hi world"));
});
