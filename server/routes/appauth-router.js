const express = require("express");
const UserModel = require('../models/appAuthModel');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const mailalert = require('../Function/mailAlert');


router.post('/signUp', async function (req, res) {
    const { userid, useremail, userphonenumber, password } = req.body || {};

    if (!userid || !useremail || !userphonenumber || !password) {
        // console.log(`message: Please provide all fields`);
        return res.json({ success: false, message: 'Please provide all fields' });
    }


    try {
        // Check if user with the same uid already exists
        const existingUser = await UserModel.findOne({ UserID: userid });
        if (existingUser) {
            // console.log(`message: User already exists`);
            return res.json({ success: false, message: 'User already exists' });
        }

        //Checking Phone number digits
        if (userphonenumber.length !== 10) {
            return res.json({ success: false, message: 'Mobile number must be exactly 10 digits!' });
        }

        // checking valid email id
        const Organization = useremail.split("@")[1];
        console.log(useremail);
        console.log(Organization);
        if (!Organization || !["gmail.com", "yahoo.com", "outlook.com"].includes(Organization.toLowerCase())) {
            throw { message: "Please use a valid Email-Id (gmail/yahoo/outlook)!" };
        }


        // Craeting hashed password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create a new user
        const newUser = new UserModel({
            UserID: req.body.userid,
            UserEmail: req.body.useremail,
            UserPhoneNumber: parseInt(req.body.userphonenumber),
            Password: hashedPassword
        });

        await newUser.save();
        
        const Note = `<html>
      <body>
      <h4> Dear ${userid},</h4>
      <p class="lead"> Being a part of our valued community, We Welcome you to the world of <b>App Authentication Service.</b></p>
      
      <hr class="my-4">
      <p><h4>Thanks <br>App Authentication Service</h4></p>
     </body>
     </html>`;

        let sendmail = await mailalert(
            useremail,
            Note
        );
        
        // console.log(`message: 'User registered successfully`);
        res.json({ success: true, message: 'User registered successfully'});

    } catch (error) {
        // console.log(`message: server error`);
        res.json({ success: false, message: 'Server error' });
    }
});

router.post('/loginvalidate', async function (req, res) {
    const { userid, password } = req.body;
    try {
        const user = await UserModel.findOne({ UserID: userid });

        if (!user) {
            return res.send({ success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.Password);

        if (!isMatch) {
            return res.send({ success: false, message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userid: user.UserID }, JWT_SECRET, {
            expiresIn: "2h" // expires in 2 hours
        });

        res.send({
            success: true,
            message: 'Login successful',
            token: token,
            data: {
                UserID: user.UserID,
                Email: user.UserEmail,
                Phone: user.UserPhoneNumber
            }
        });

    } catch (error) {
        res.send({ success: false, message: 'Server error' });
    }
});



// ------------------------**********************************************---------------------------------------
// below one is for checking the data is coming accordingly or not

// router.get("/getuser/:id", async (req,res)=>{
//     userid = req.params.id;
//     let result = await UserModel.findOne({ UserID: userid }, { UserID: 1, UserEmail: 1, UserPhoneNumber: 1, _id: 0 });
//     try {
//         res.status(200).send({ message: `[Read All] - No. of items get from database ${result.length}`, data: result});
//     }
//     catch (error) {
//         res.status(500).send(error);    
//     }
// });
// ------------------------**********************************************---------------------------------------
module.exports = router;