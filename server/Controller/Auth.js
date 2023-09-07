/** @format */

// Import required modules and libraries
const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Send OTP
exports.sendOTP = async (req, res) => {
  try {
    // Find user by email
    const { email } = req.body;

    // Check if user exists
    const checkUserPresent = await User.findOne({ email });

    // If user is already present, return an error
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    // Generate OTP
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("OTP Generated", otp);

    // Check if OTP is unique or not
    let result = await OTP.findOne({ otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp });
    }

    const otpPayLoad = { email, otp };
    console.log(otpPayLoad);

    // Create a new OTP record in the database
    const otpBody = await OTP.create(otpPayLoad);

    // Return success message along with the OTP
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Sign up Controller

exports.signUp = async (req, res) => {
  try {
    //featch  data from request body
    const {
      firstName,
      lastName,
      otp,
      email,
      password,
      confirmpassword,
      accountTypes,
      contactNumber,
    } = req.body;

    //validate user details

    if (!firstName || !lastName || !email || !password || !confirmpassword) {
      return res.status(403).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    //check password and conform password    is same or not
    if (password !== confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password does not match",
      });
    }

    //check user is exists or not

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // find most recent otp for the user

    const recentOtp = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);
    if (recentOtp.length == 0) {
      //otp not found
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    //Hash password

    const hashPassword = await bcrypt.hash(password, 10);

    //save user in database

    const profileDetailes = await User.create({
      gender: null,
      dateofbirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      lastName,
      firstName,
      email,
      contactNumber,
      password: hashPassword,
      accountTypes,
      profile: profileDetailes._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    //return success message
    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User is not created please try again",
    });
  }
};

// Login Controller

exports.login = async (req, res) => {
  try {
    // Fetch data from request body
    const { email, password } = req.body;

    // Validate user details
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required. Please fill in all the details.",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email }).populate("AdditionalDetails");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist. Please sign up first.",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountTypes,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // Store the token in the user object (optional)
    user.token = token;

    // Set the token as a cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
    };

    res.cookie("token", token, options);

    // Return success message with token in the response
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User could not be logged in. Please try again later.",
    });
  }
};

// change password controller
// TODO - Homework
exports.changePassword = async (req, res) => {
  try {
  } catch {}
};
