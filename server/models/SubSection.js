/** @format */

const mongoose = require("mongoose");

//creting the schema

const subSectionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  timeDuration: {
    type: String,
  },
  description: {
    type: String,
  },
  videoURL: {
    type: String,
  },
});

//export the model

module.exports = mongoose.model("SubSetion", subSectionSchema);
