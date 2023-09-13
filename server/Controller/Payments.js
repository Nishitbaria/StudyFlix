/** @format */

const instance = require("../config/Razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");

exports.createOrder = async (req, res) => {
  try {
    var instance = new Razorpay({
      key_id: "YOUR_KEY_ID",
      key_secret: "YOUR_SECRET",
    });

    var options = {
      amount: 50000, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    instance.orders.create(options, function (err, order) {
      console.log(order);
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
