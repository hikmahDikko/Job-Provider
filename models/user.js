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
    linkedInURL : {
        type : String,
    },
    githubURL : {
        type : String,
    },
    cv : {
        type : String,
    },
    skill : {
        type : String,
        enum : ["frontend developer", "backend developer", "UI/UX designer", "product designer", "full stack developer"], 
    },
    workxperience : {
        type : String,
        emum : ["No experience", "1 year", "2 years", "3 years", "4 and above years"]
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
        enum : ["employee", "admin"]
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;