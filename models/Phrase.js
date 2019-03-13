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
  saved: {
    type: Boolean,
    default: false
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },

  // `notes` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the Note model
  // This allows us to populate the User with any associated Notes
  notes: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Note model
      ref: "Note"
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
var Phrase = mongoose.model("Phrase", PhraseSchema);

// Export the Phrase model
module.exports = Phrase;
