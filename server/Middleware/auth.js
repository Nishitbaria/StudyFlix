/** @format */
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth

exports.auth = async (req, res, next) => {
  try {
    //extract token from cookie
    const token =
      res.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    //if token not found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    //verify the token

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      res.user = decode;
    } catch (error) {
      //if token is doesn't match
      return res.status(401).json({
        success: false,
        message: " token is Invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong while verifying token",
    });
  }
};

//isStudent

exports.isStudent = async (req, res, next) => {
  try {
    if (res.accountType.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is Private route for Student only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified , please try again later",
    });
  }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (res.accountType.role !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is Private route for Instructor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified , please try again later",
    });
  }
};
//isAdmin

exports.isAdmin = async (req, res, next) => {
  try {
    if (res.accountType.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is Private route for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified , please try again later",
    });
  }
};
