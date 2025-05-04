const express = require("express");
const router = express.Router();
const ResetPasswordRequestLink = require("../Function/ResetPasswordRequestLink");
const ResetPassword = require("../Function/resetapppassword");

router.post("/requestResetPassword", async (req, res) => {
  const { useremail } = req.body ;

  if (!useremail) {
    return res.json({ success: false, message: "Please provide a valid email" });
  }

  const response = await ResetPasswordRequestLink(useremail);
  res.json(response);
});


router.post("/reset-password", async (req, res) => {
  const { password, confirmPassword, token} = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  const result = await ResetPassword(token, password);
  res.json(result);
});

module.exports = router;
