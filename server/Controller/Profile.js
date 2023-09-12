/** @format */

const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");

exports.updateProfile = async (req, res) => {
  try {
    // fetch data from the request body

    const { dateofbirth = "", about = "", contactNumber, gender } = req.body;
    //get user id
    const id = req.user.id;

    //valdate the profile
    if (!contactNumber || !gender || !id) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the fields",
        error: "Please enter all the fields",
      });
    }

    //find the profile

    const userDetails = await User.findOne({ user: id }); //find the USer
    const ProfileId = userDetails.additionalDetails; //get the additionalDetails
    const ProfileDetails = await Profile.findById(ProfileId); //find the profile

    //update the profile

    ProfileDetails.dateofbirth = dateofbirth;
    ProfileDetails.about = about;
    ProfileDetails.contactNumber = contactNumber;
    ProfileDetails.gender = gender;
    await ProfileDetails.save();

    //return the response

    return res.status(200).json({
      success: true,
      message: "User Information Updated Successfully",
      ProfileDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "unable to update User Information  , Try again Letter",
      error: error.message,
    });
  }
};

exports.deleteProfile = async (req, res) => {
  //Exporler the CronJobs to delete the profile after 30 days of inactivity
  try {
    //get user id
    const id = req.user.id;

    //find the profile

    const userDetails = await User.findById(id); //find the USer

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "No User Found",
      });
    }

    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    await Course.updateMany(
      { studentsEnrolled: UserDetails._id },
      { $pull: { studentsEnrolled: userDetails._id } }
    );

    await User.findByIdAndDelete({ _id: id });

    //delete the profile

    //return the response

    return res.status(200).json({
      success: true,
      message: "User Information Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "unable to delete User Information  , Try again Letter",
      error: error.message,
    });
  }
};

exports.getAllUsersDetails = async (req, res) => {
  try {
    const id = req.user.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "No User Found",
      });
    }

    const userDetails = await User.findById(id)
      .populated("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Fetch User data Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "unable to Get User Information  , Try again Letter",
      error: error.message,
    });
  }
};
