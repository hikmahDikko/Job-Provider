const mongoose = require("mongoose");

const applicaionSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.objectId,
        ref : "User"
    }, 
    applicationId : {
        type : mongoose.Schema.objectId,
        ref : "JobApplication"
    },
    status : {
        type : String,
        status : [shortListed, accepted, rejected]
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

module.exports = model.mongoose("JobApplication", applicaionSchema);