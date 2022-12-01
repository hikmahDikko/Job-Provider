const mongoose = require("mongoose");

const jobRecommendationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    jobId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
    },
    status : {
        type: String,
        enum : ["apply", "shortlist", "accept", "reject"]
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    }
});

module.exports = mongoose.model("JobRecommendation", jobRecommendationSchema)