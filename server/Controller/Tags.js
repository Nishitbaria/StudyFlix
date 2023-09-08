/** @format */
// import the model
const Tag = require("../models/tags");

// Create a new tag controller

exports.createTag = async (req, res) => {
  try {
    // Fetch tags from req.body
    const { name, description } = req.body;

    // Validate tags
    if (!name || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Save tags in the database
    const tagDetails = await Tag.create({
      name: name,
      description: description,
    });

    // Send response
    console.log(tagDetails);
    return res
      .status(200)
      .json({ success: true, message: "Tag is created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all tags controller
exports.showAlltags = async (req, res) => {
  try {
    const alltags = await Tag.find({}, { name: true, description: true });

    return res.status(200).json({
      success: true,
      message: "All tags are required successfully",
      alltags,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//
