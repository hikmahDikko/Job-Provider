const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true, "Please enter your first name"],
    },
    lastName : {
        type : String,
        required : [true, "Please enter your last name"]
    },
    middleName : {
        type : String,
        required : [true, "Please enter your middle name"]
    }, 
    email : {
        type : String,
        required : [true, "Please enter an email"],
        unique : true,
        lowercase : true,
        validate : [isEmail, "Please enter a valid email"]
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
    phoneNumber : {
        type : String,
    },
    cv : {
        type : String,
        //required : [true, "Please upload your CV"]
    },
    jobRecommendation : [{
        type : mongoose.Schema.ObjectId,
        ref : "Job",
    }],
    skill : {
        type : String,
        enum : ["frontend developer", "backend developer", "UI/UX designer", "product designer", "full stack developer"], 
    },
    experience : {
        type : String,
    },
    address : {
        type : String,
    },
    profileImage : {
        type : String,
    },
    role : {
        type : String,
        default : "employee",
        enum : ["employee", "employer", "admin"]
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;