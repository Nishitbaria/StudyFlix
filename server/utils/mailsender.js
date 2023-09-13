/** @format */

const nodemailer = require("nodemailer");

const mailsender = async (email, title, body) => {
  try {
    // Validate input parameters (add your validation logic here)

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: "Study | Flix",
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully:");

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = mailsender;
