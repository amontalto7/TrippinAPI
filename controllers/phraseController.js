const Phrase = require("../models/Phrase");

// Get all phrases, populated with notes
exports.phrase_list_get = function(req, res) {
  Phrase.find()
  .populate("notes")
  .then(function(dbNotes) {
    // If all Notes are successfully found, send them back to the client
    res.json(dbNotes);
  })
  .catch(function(err) {
    // If an error occurs, send the error back to the client
    res.json(err);
  });
  
};

// return a single phrase
exports.phrase = function(req, res) {
  res.send("NOT IMPLEMENTED: Get single phrase")
};
