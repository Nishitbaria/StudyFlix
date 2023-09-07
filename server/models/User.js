/** @format */
//import the library
const mongoose = require("mongoose");

//creting the schema

const userSchema = new mongoose.Schema({
  name: {
    //name of the user
    type: String,
    required: true,
    trim: true,
  },
  email: {
    //    email of the user
    type: String,
    required: true,
    trim: true,
  },
  password: {
    //password of the user
    type: String,
    required: true,
  },
  accountTypes: {
    //account type of the user
    type: String,
    required: true,
    enum: ["Admin", "Student", "Instructor"], //enum is used to restrict the values of the field
  },
  additionalDetails: {
    //additional details of the user
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  course: {
    //course of the user
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  image: {
    //image of the user
    type: String,
    required: true,
  },
  courseProgress: {
    //course progress of the user
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseProgress",
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

//export the model

module.exports = mongoose.model("User", userSchema);
