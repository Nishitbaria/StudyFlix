/** @format */

const mongoose = require("mongoose");

//creting the schema

const Section = new mongoose.Schema({
  sectionName: {
    type: String,
  },
  subSections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "SubSection",
    },
  ],
});

//export the model

module.exports = mongoose.model("Setion", Section);
