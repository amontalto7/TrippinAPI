// example: https://dev.to/asciidev/testing-a-nodeexpress-application-with-mocha--chai-4lho
// Import the dependencies for testing
var chai = require("chai"),
  chaiHttp = require("chai-http");

var server = require("../server");
var request;

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Phrases", () => {
  beforeEach(function() {
    request = chai.request(server);
  });

  describe("GET /api/phrases", () => {
    // Test to get all phrases
    it("should get all phrases", done => {
      request.get("/api/phrases").end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("array");
        res.body[0].should.be.an("object").that.includes({ phrase: "Goodbye" });
        done();
      });
    }).timeout(10000);
  });
});
