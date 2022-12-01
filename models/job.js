const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    employer : {
        type: mongoose.Schema.ObjectId,
        ref : "Employer",
        required: [true, "Please enter your ID as an employer"]
    },
    companyName : {
        type : String,
        required : [true, "Please enter the company's name"],
        unique : true
    },
    title : {
        type : String,
        required : [true, "Please enter the job title"],
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
    keyword : {
        type : String,
        required : [true, "Please enter the job location"],
        enum : ["Nodejs", "TypeScript", "Nestjs", "Figma", "Express", 
            "HTML", "CSS", "JAVASCRIPT/BOOTSTRAP/JQUERY", "Adobe"]
    },
    description : {
        type : String,
        required : [true, "Please enter the job description"]
    },
    address : {
        type : String,
    },
    jobType : {
        type : String,
        required : [true, "Please enter the job type"],
        enum : ["Remote", "Physical"]
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