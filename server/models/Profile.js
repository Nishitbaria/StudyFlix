/** @format */

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: true,
  },
  dateofbirth: {
    type: Date,
    required: true,
  },
  about: {
    type: String,
    required: true,
    trim: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
