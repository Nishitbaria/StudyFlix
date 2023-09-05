/** @format */
//import the library
const mongoose = require("mongoose");

// creating the schema

const courseProgress = new mongoose.Schema({
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  completedVidoes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
});

//export the model

module.exports = mongoose.model("CourseProgress", courseProgress);
