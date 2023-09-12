/** @format */
const SubSection = require("../models/SubSection");
const Section = require("../model/Section");
const Course = require("../model/Course");
const { uploadVideoToCloudinary } = require("../utils/cloudinary");

exports.createSection = async (req, res) => {
  try {
    //fetch data from the request body

    const { sectionId, title, description, videoURL, timeDuration } = req.body;

    //featch video files from the request body

    const video = req.files.videoFile;

    // valdate the section
    if (
      !sectionId ||
      !title ||
      !description ||
      !videoURL ||
      !timeDuration ||
      !video
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    //uplouad video on cloudinary
    const uploudeDetails = await uploadVideoToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    //update the section in to db with course

    const newVideoDetails = await SubSection.create({
      title: title,
      timeDuration: (d = timeDuration),
      description: description,
      videoURL: uploudeDetails.secure_url,
    });
    // TODO: Add tbe Populate method to the Section model
    const subsectionDetails = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: { subSection: newVideoDetails._id },
      },
      { new: true }
    ).populate("subSection");

    //return the response

    return res.status(200).json({
      success: true,
      message: " SubSection is created successfully",
      data: subsectionDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "unable to create Course Section , Try again Letter",
      error: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    //fetch data from the request body
    const { subSectionId, title, description, videoURL, timeDuration } =
      req.body;

    //validate the Subsection id

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing subSectionId",
      });
    }

    // Update the subSection in the database
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      { _id: subSectionId },
      {
        title: title,
        description: description,
        videoURL: videoURL,
        timeDuration: timeDuration,
      },
      { new: true }
    );

    //return the response
    return res.status(200).json({
      success: true,
      message: " SubSection is updated successfully",
      data: updatedSubSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "unable to update Course Section , Try again Letter",
      error: error.message,
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    //featching the Subsection id from the request poram

    const { subSectionId } = req.params;

    //valdating the Subsection id

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });

      //delete the entery into DB

      await SubSection.findByIdAndRemove(subSectionId);

      return res.status(200).json({
        success: true,
        message: " SubSection is deleted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "unable to delete Course Section , Try again Letter",
      error: error.message,
    });
  }
};
