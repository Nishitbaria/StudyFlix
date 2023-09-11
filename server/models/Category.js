/** @format */

const mongoose = require("mongoose");

// Creating the schema

const categorySchema = new mongoose.Schema({
  category: {
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

module.exports = mongoose.model("Category", categorySchema);
