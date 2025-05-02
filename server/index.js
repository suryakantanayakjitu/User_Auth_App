// require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const AppAuthRouter = require('./routes/appauth-router');
const ResetAppPasswordRouter = require('./routes/resetAppPassword-router');
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", AppAuthRouter);
app.use("/api", ResetAppPasswordRouter);

app.get("/", function(req,res)
{
    res.send("Welcome to Express JS API Application");
});


// const PORT = process.env.PORT || 3005;
app.listen(3005, function() {
    console.log(`Server Started. URL: http://localhost:3005`);
});