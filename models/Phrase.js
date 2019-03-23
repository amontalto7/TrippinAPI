var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var PhraseSchema = new Schema({
  // `headline` is required and of type String
  phrase: {
    type: String,
    required: true,
    unique: true  
  },
  customTranslation: {
    type: String
  },
  language: {
    type: String,
    required: true,
    default: "en"
  },
  default: {
    type: Boolean,
    default: false
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

// This creates our model from the above schema, using mongoose's model method
var Phrase = mongoose.model("Phrase", PhraseSchema);

// Export the Phrase model
module.exports = Phrase;
