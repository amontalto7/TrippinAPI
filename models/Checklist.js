var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ChecklistSchema = new Schema({
  // `headline` is required and of type String
  item: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String
  },
  checked: {
    type: Boolean,
    default: false
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

// Error Handling Middleware
ChecklistSchema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("There was a duplicate key error"));
  } else {
    next();
  }
});

// This creates our model from the above schema, using mongoose's model method
var Checklist = mongoose.model("Checklist", ChecklistSchema);

// Export the Checklist model
module.exports = Checklist;
