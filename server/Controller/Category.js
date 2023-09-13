/** @format */

// import the model
const Category = require("../models/Categorys");

// Create a new category controller

exports.createCategory = async (req, res) => {
  try {
    // Fetch data from req.body
    const { category, description } = req.body;

    // Validate data
    if (!category || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Save category in the database
    const categoryDetails = await Category.create({
      category: category,
      description: description,
    });

    // Send response
    console.log(categoryDetails);
    return res
      .status(200)
      .json({ success: true, message: "Category is created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all categories controller
exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { category: true, description: true }
    );

    return res.status(200).json({
      success: true,
      message: "All categories are retrieved successfully",
      allCategories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
