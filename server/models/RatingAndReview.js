/** @format */

const mongoose = require("mongoose");

// Creating the schema

const ratingAndReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

// Export the model

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);
