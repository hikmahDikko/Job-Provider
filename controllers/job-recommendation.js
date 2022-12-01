const Job = require("../models/job");
const User = require("../models/user");
const JobRecommendation = require("../models/job-recommendation")

exports.jobRecommendations = async (req, res) => {
    let userId = req.user.id;
    const user = await User.findOne({userId});
    const job = await Job.find();

    console.log(job)
    
    if (job.category === user.skill) {
        const jobs = await JobRecommendation.create({
            userId,
            jobId : job.id
        })

        return res.status(201).json({
            message : "success",
            data : {
                jobs
            }
        })
    }
}