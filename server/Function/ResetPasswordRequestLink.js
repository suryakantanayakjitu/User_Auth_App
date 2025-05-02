const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/appAuthModel");
require("dotenv").config();

const ResetPasswordRequestLink = async function (useremail = "") {
  try {
    const user = await UserModel.findOne({ UserEmail: useremail });

    if (!user) {
      return { success: false, message: "Email not registered" };
    }

    const token = jwt.sign({ userid: user.UserID },process.env.JWT_SECRET,{ expiresIn: "60m" });
    console.log(token);
    const resetLink = `http://localhost:4200/reset-password?token=${token}`;
    

    const transporter = nodemailer.createTransport({
      secure: true,
      service: "gmail.com",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: useremail,
      subject: "Password Reset Request",
      text: `Click the following link to reset your password: ${resetLink}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 15 minutes.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Reset email sent: ", info.response);

    return { success: true, message: "Password reset email sent" };

  } catch (error) {
    console.error("Error in ResetPasswordRequest:", error);
    return { success: false, message: "Server error in reset request" };
  }
};

module.exports = ResetPasswordRequestLink;
