const mongoose = require("mongoose");

const jobApplicaionSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.objectId,
        ref : "User"
    }, 
    jobId : {
        type : mongoose.Schema.objectId,
        ref : "Job"
    },
    status : {
        type : String,
        default : "denied",
        //applied, denied
    }
});

jobApplicaionSchema.pre(/^find/, function (next) {
    this.populate([
        {
        path: "employeeId",
        select: "",
        }
    ]);
    next();
});

module.exports = model.mongoose("JobApplication", jobApplicaionSchema);