var db = require("../models");

// REQUIRE AXIOS FOR API CALLS
var axios = require("axios");

module.exports = function(app) {
  app.get("/api/phrases", function(req, res) {
    db.Phrases.findAll().then(function(dbPhrases) {
      res.json(dbPhrases);
    });
  });

  //   app.get("/api/checklist", function(req, res) {
  // ...
  // });
};
