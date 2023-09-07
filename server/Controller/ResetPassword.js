/** @format */

const User = require("../models/User");
const mailer = require("../utils/mailer");
const bycrypt = require("bcryptjs");

//restart password token

exports.resetPassword = async (req, res) => {
  try {
    //get mail from req.body

    const { email } = req.body.email;

    // check user exist or not , email validation

    const user = await User.findone({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "your email is not register with us ",
      });
    }

    //generate token

    const token = crypto.randomUUID();

    //update the user tokken and expiry time

    const updatedDetailes = await User.findandUpdate(
      { email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    //create the reset password url

    const url = `http://localhost:3000/update-password/${token}`;

    //  send mail to user with token

    await mailsender(email, "reset password", `Password reset link ${url}`);

    //return respone

    return res.json({
      success: true,
      message:
        "Email sent successfully please check the email and update your password now",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went Wrong while reset the password",
    });
  }
};

//reset password link

exports.updatePassword = async (req, res) => {
  try {
    // get token from req.params and password from req.body

    const { password, confirmpassword, token } = req.body;

    //validation
    if (password !== confirmpassword) {
      return res.json({
        success: false,
        message: "password not match",
      });
    }

    //if user is not found it mean tokken in invaild

    const userDetail = await User.findone({ token });

    if (!userDetail) {
      return res.json({
        success: false,
        message: "token is invaild",
      });
    }

    //check token time is expire or not

    if (userDetail.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Token is expire , Please Regenerate the token",
      });
    }

    //hash the password

    const hashPassword = await bycrypt.hash(password, 10);

    //update the user password

    await User.findandUpdate(
      { token },
      { password: hashPassword },
      { new: true }
    );

    //return the respone

    return res.status(200).json({
      success: true,
      message: "Password update successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went Wrong while update the password",
    });
  }
};
