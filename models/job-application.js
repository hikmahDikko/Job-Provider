const mongoose = require("mongoose");

const jobApplicaionSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    }, 
    jobId : {
        type : mongoose.Schema.ObjectId,
        ref : "Job"
    },
    status : {
        type : String,
        default : "denied",
        enum : ["applied", "shortListed", "accepted", "rejected"]
    }
});

// jobApplicaionSchema.pre(/^find/, function (next) {
//     this.populate([
//         {
//         path: "jobId",
//         select: "",
//         }
//     ]);
//     next();
// });

module.exports = mongoose.model("JobApplication", jobApplicaionSchema);