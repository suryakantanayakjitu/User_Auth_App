const express = require("express");
var nodemailer = require("nodemailer");
require("dotenv").config();

const MailAlert = async function (
  useremail = "",
  Note = ""
  // Subject = "Welcome to App Authentication."
) {
  try {
    const transporter = nodemailer.createTransport({
      secure: true,
      service: 'gmail.com',
      auth: {
        // user: 'onlyforpersonalprojectuses@gmail.com',           // replace with your email
        // pass: 'lode ovyq lfnx bayw'   // use an app-specific password (not your real password)
        user: process.env.EMAIL_USER,           // replace with your email
        pass: process.env.EMAIL_PASS   // use an app-specific password (not your real password)
      }
    });

    const mailOptions = {
      from: 'onlyforpersonalprojectuses@gmail.com',
      to: useremail,
      subject: "Welcome to App Authentication.",
      text: Note,
      html: Note
    };

    console.log(useremail);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
        // return { success: true, message: "Email sent" };
      }
    });

  } catch (error) {
    console.log("Error in Mail Alert: ", error);
    // return { success: false, message: "Error in Mail Alert" };
  }
}
module.exports = MailAlert;