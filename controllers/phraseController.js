const Phrase = require("../models/Phrase");
const axios = require("axios");
const locRecog = require("../utils/location-recognition");

// Get all phrases, populated with notes
exports.phrase_list_get = function (req, res) {
  console.log("hello");
  return Phrase.find()
    // .populate("notes")
    .then(function (dbPhrases) {
      console.log("bye");
      if (res === false) return dbPhrases;
      // If all Notes are successfully found, send them back to the client
      res.json(dbPhrases);
    })
    .catch(function (err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });

};

// Translate function
exports.translate = function (req, res) {
  Phrase.find()
    .then(function (dbPhrases) {
      const phrases = dbPhrases.map(item => item.phrase);
      locRecog(phrases);
    })
  // axios.get("https://trippin-api-2019.herokuapp.com/api/phrases")
  //   .then(async response => {
  //     // console.log(res)

  //   });
}



// return a single phrase
exports.phrase = function (req, res) {
  res.send("NOT IMPLEMENTED: Get single phrase")
};

// Populate default phrases
exports.populate_default_phrases = function (req, res) {

  const defaultPhrases = [
    "Hello",
    "Goodbye",
    "Excuse me",
    "Do you speak English?",
    "Thank you",
    "Please",
    "You're Welcome",
    "I want that",
    "What is this?",
    "I don't understand",
    "My name is John",
    "What is your name?",
    "Where is the bathroom?",
    "How much does it cost?",
    "Yes",
    "No",
    "Taxi",
    "Hotel",
    "Restaurant"
  ];

  defaultPhrases.forEach(function (item) {
    var thisPhrase = new Phrase({ phrase: item, default: true });
    thisPhrase.save(function (err, p) {
      if (err) return console.error(err);
      console.log("'" + p.phrase + "' saved to phrases collection.");
    })
  })
  res.send("Phrases added. Check console for details");
}

