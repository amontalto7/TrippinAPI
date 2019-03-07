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
