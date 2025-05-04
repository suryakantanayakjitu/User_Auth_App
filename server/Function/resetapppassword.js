const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/appAuthModel");
require("dotenv").config();

const ResetPassword = async function (token, newPassword) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userid;
    // console.log(decoded);
    // console.log(userId);
    

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await UserModel.updateOne(
      { UserID: userId },
      {$set: { Password: hashedPassword }},
      { new: true }
    );

    if (!updatedUser) {
      return { success: false, message: "User not found or update failed" };
    }

    return { success: true, message: "Password has been updated successfully" };
  } catch (error) {
    console.log("Reset password error:", error);
    return { success: false, message: "Invalid or expired token" };
  }
};

module.exports = ResetPassword;
