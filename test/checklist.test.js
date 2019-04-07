// example: https://dev.to/asciidev/testing-a-nodeexpress-application-with-mocha--chai-4lho
// Import the dependencies for testing
var chai = require("chai"),
  chaiHttp = require("chai-http");

var server = require("../server");
var request;

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Checklist", () => {
  beforeEach(function() {
    request = chai.request(server);
  });

  describe("GET /api/checklist", () => {
    // Test to get all phrases
    it("should get all checklist items", done => {
      request.get("/api/checklist").end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("array");
        res.body[0].should.be.an("object").that.includes({ item: "Passport" });
        done();
      });
    }).timeout(10000);
  });
});
