const mongoose = require("mongoose");
const db = require("../models");
const Phrase = require("../models/Phrase");

// This file empties the Phrases and Checklist collections and inserts the data below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trippindb");

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

db.Phrase.deleteMany({})
  .then(() => {
    defaultPhrases.forEach(item => {
      var thisPhrase = new Phrase({ phrase: item, default: true });
      thisPhrase.save(function(err, p) {
        if (err) return console.error(err);
        console.log("'" + p.phrase + "' saved to phrases collection.");
      });
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const checklistSeed = [
  {
    item: "Passport"
  },
  {
    item: "Local power converter"
  },
  {
    item: "Phone charger"
  },
  {
    item: "Set Credit Card travel notifications"
  },
  {
    item: "Next Pillow"
  },
  {
    item: "Hiking Boots"
  },
  {
    item: "Lock"
  },
  {
    item: "Offline maps downloaded"
  }
];

db.Checklist.deleteMany({})
  .then(() => db.Checklist.insertMany(checklistSeed, { rawResult: true }))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
