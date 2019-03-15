var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// When a new user is created, we will populate this with all default phrases
var UserPhraseSchema = new Schema({
  // `headline` is required and of type String
  userId: {
    type: String,
    required: true,
    unique: true
  },

  // `phrases` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the Phrase model
  // This allows us to populate the UserPhrase with any associated Phrases
  phrases: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Note model
      ref: "Phrase"
    }
  ],

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
var UserPhrase = mongoose.model("UserPhrase", UserPhraseSchema);

// Export the UserPhrase model
module.exports = UserPhrase;
