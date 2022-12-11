const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    employerId : {
        type: mongoose.Schema.ObjectId,
        ref : "Employer"
    },
    companyName : {
        type : String,
        required : [true, "Please enter the company's name"],
    },
    title : {
        type : String,
        required : [true, "Please enter the job title"],
    },
    salary : {
        type : String,
        required : [true, "Please enter the job salary"],
        enum : ["negotiable", "$500-$1000", "$1000-$2000", "$2000-$3000"]
    },
    companyWebsite : {
        type : String,
    },
    category : {
        type : String,
        required : [true, "Please enter the job category"],
        enum : ["frontend developer", "backend developer", 
            "UI/UX designer", "product designer", "full stack developer"]
    },
    location : {
        type : String,
        required : [true, "Please enter the job location"],
        enum : ["Lagos", "Abuja", "Ogun"]
    },
    address : {
        type : String
    },
    development : {
        type : String,
        required : [true, "Please enter the job title development"],
        enum : ["JavaScript/frontend", "Java", "C#/.NET", "Python", "PHP",
            "Nodejs", "IOS", "Android", "C/C++", "Flutter", "Figma", "Adobe"]
    },
    description : {
        type : String,
        required : [true, "Please enter the job description"]
    },
    yearOfExperience : {
        type : String,
        required: [true, "Please enter work experience required for the job"],
        emum : ["No experience", "1 year", "2 years", "3 years", "4 and above years"]
    },
    jobType : {
        type : String,
        required : [true, "Please enter the job type"],
        enum : ["Remote", "Physical"]
    },
    companyType : {
        type : String,
        required : [true, "Please enter the company type"],
        enum : ["Software", "Product", "Security", "Service", "Others"]
    },
    workType :{
        type : String,
        required : [true, "Please enter the work type"],
        enum : ["Full Time", "Part Time"]
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;