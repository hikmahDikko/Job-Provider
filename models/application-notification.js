const mongoose = require("mongoose");

const applicaionSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    }, 
    applicationId : {
        type : mongoose.Schema.ObjectId,
        ref : "JobApplication"
    },
    status : {
        type : String,
        status : ["shortListed", "accepted", "rejected"]
    }
});

applicaionSchema.pre(/^find/, function (next) {
    this.populate([
        {
        path: "employeeId",
        select: "",
        }
    ]);
    next();
});

module.exports = mongoose.model("ApplicationNotification", applicaionSchema);