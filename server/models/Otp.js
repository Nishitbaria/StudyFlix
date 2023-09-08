/** @format */

const mongoose = require("mongoose");
const mailsender = require("../utils/mailsender");

// Creating the schema

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

async function sendVerificationMail(email, title, body) {
  try {
    const mailresponse = await mailsender(
      email,
      "Study | Flix",
      "Your OTP is ",
      otp
    );

    console.log("Email sent successfully:", mailresponse);
  } catch (error) {
    console.error("Email send error:", error);
  }
}

OTPSchema.pre("save", async function (next) {
  await sendVerificationMail(this.email, this.otp);
  next();
});

// Export the model

module.exports = mongoose.model("OTP", OTPSchema);
