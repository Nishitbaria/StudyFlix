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

    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Email send error:", error);
  }
};

module.exports = mailsender;
