/** @format */

const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    //fetch data from the request body

    const { sectionName, courseId } = req.body;

    //valdate the section

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    //check if the course exist

    const newCourse = await Section.create({ sectionName });

    const updateCourseDetailes = await Course.findByIdAndUpdate(
      courseId,
      { $push: { sections: newCourse._id } },
      { new: true }
    );

    //Todo : replace the section and subsetion in both updatedCorseDetails using populate

    //return the response

    return res.status(200).json({
      success: true,
      message: "Section Created successfully",
      updateCourseDetailes,
    });

    //update the section in to db with course

    //return the response
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "unable to create Course Section , Try again Letter",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    //data fetch from the request body

    const { sectionName, sectionId } = req.body;

    //validate the section

    if (!sectionName || !sectionId) {
      return res.status(400).json({ message: "Missing Properties" });
    }

    //update the section in to db with course

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true } //new:true is used to get the updated data
    );

    //return the response

    return res
      .status(200)
      .json({ success: true, message: "Section Updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "unable to Update Course Section , Try again Letter",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    //get the section id from the request params

    const { sectionId } = req.params;

    //DELETE THE SECTION FROM THE DB

    //TODO: we also have to delete the section id into the course section array [at testing time]

    await Section.findByIdAndDelete(sectionId);

    //return the response

    return res.status(200).json({
      success: true,
      message: "Section Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "unable to Delete Course Section , Try again Letter",
      error: error.message,
    });
  }
};
