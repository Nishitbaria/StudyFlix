/** @format */
const User = require("../models/User");
const Course = require("../models/Course");
const Category = require("../models/category"); // Change from Tag to Category
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createCourse = async (req, res) => {
  try {
    // Fetching Course data from req.body

    const { courseName, courseDescription, whatYouWillLearn, price, category } =
      req.body;

    const { thumbnail } = req.files.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category || // Change from tag to category
      !thumbnail
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Fetching the data of instructor

    const userId = req.user.id; // This is the id of the instructor
    const instructorDetails = await User.findById(req.user.id); // This is the data of the instructor
    console.log("Instructor Details", instructorDetails);

    // Save Course in the database

    if (!instructorDetails) {
      return res
        .status(400)
        .json({ success: false, message: "Instructor Details not found" });
    }

    // Find the category using id

    const categoryDetails = await Category.findById(category); // Change from tag to category

    // Validate category

    if (!categoryDetails) {
      return res
        .status(400)
        .json({ success: false, message: "Category Details not found" });
    }

    // Upload image to Cloudinary

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // Create Course

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      category: categoryDetails._id, // Change from tag to category
      thumbnailImage: thumbnailImage.secure_url,
    });

    // Add the course id to the instructor's courses array and save it

    await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // Update the category's courses array and save it

    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id }, // Change from tag to category
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // Send response

    return res.status(200).json({
      success: true,
      message: "Course is created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all the courses

exports.getAllCourses = async (req, res) => {
  try {
    // Todo: Change the below code to find the incremental data
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReview: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All courses are retrieved successfully",
      allCourses,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: error.message, error: error.message });
  }
};
