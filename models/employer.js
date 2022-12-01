const mongoose = require("mongoose");
const { isEmail } = require("validator")

const employerSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : [true, "Please enter your first name"],
    },
    companyName : {
        type : String,
        required : [true, "Please enter the company's name"],
        unique : true
    },
    email: {
        type: String,
        required: [true, "Please enter an email address"],
        lowercase : true,
        validate : [isEmail, "Please enter a valid email"]
    },
    phoneNumber : {
        type : String,
    },
    profileImage :{
        type : String,
    },
    password : {
        type : String,
        required : [true, "Password field is required"],
        minlength : [8, "Password is less than 8 characters"],
        select: false,
    },
    confirmPassword : {
        type : String,
        minlength : [8, "Password is less than 8 characters"],
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    role : {
        type : String,
        default : "employer",
        enum : ["employee", "employer", "admin"]
    },
});

module.exports = mongoose.model("Employer", employerSchema);