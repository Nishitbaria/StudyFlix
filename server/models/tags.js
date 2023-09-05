/** @format */

const mongoose = require("mongoose");

// Creating the schema

const tagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  courses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

// Export the model

module.exports = mongoose.model("Tags", tagsSchema);
