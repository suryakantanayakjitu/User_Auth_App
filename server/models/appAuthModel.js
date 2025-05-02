// Load environment variables from .env file
require('dotenv').config();

const mongoose = require('mongoose');

// Connect to MongoDB using URI from .env
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:---------", err));



const Schema = mongoose.Schema;

const UserSignupSchema = new Schema(
    {
        UserID: String,
        UserEmail: String,
        UserPhoneNumber: Number,
        Password: String
    },
    { versionKey: false }
);

// Create Model
const appAuthModel = mongoose.model('users', UserSignupSchema);

module.exports = appAuthModel;
