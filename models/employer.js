const mongoose = require("mongoose");
const { isEmail } = require("validator")

const employerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please enter your fullName"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email address"],
        unique : true,
        lowercase : true,
        validate : [isEmail, "Please enter a valid email"]
    },
    phoneNumber : {
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
});

module.exports = mongoose.model("Employer", employerSchema);