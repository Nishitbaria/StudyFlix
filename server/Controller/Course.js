/** @format */
const User = require("../models/User");
const Course = require("../models/Course");
const Tag = require("../models/tags");
const { uploudImageToCloudinary } = require("../utils/imageUploader");

exports.createCourse = async (req, res) => {
  try {
    //featchbng Course data form req.body

    const { courseName, courseDescription, whatYouWillLearn, price, tag } =
      req.body;

    const { thumbnail } = req.files.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    //featching the data of instructor

    const userId = req.user.id; ///this is the id of instructor
    const instructorDetails = await User.findById(req.user.id); ///this is the data of instructor
    console.log("instructor Deatiles", instructorDetails);
    //TODO: veriffy that userId and instructorDetails._id are the same  or not

    //save Course in database

    if (!instructorDetails) {
      return res
        .status(400)
        .json({ success: false, message: "instructor Details not found" });
    }

    //find the tag   using id

    const tagDetails = await Tag.findById(tag);

    //validate tag

    if (!tagDetails) {
      return res
        .status(400)
        .json({ success: false, message: "Tag Details not found" });
    }

    //upload image to cloudinary

    const thumbnailImage = await uploudImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create Course

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag: tagDetails._id,
      thumbnailImage: thumbnailImage.secure_url,
    });

    //add the course id to instructor   courses array   and save it

    await User.findByIdAndUpdate(
      ///this is the id of instructor
      { _id: userId },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    //update the tag courses array  and save it

    await Tag.findByIdAndUpdate(
      { _id: tagDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    //send response

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

//get all the courses

exports.getAllCourses = async (req, res) => {
  try {
    //Todo: change the below code for find the incrementally data
    const allcourses = await Course.find(
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
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: error.message, error: error.message });
  }
};
