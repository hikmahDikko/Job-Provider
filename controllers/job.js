const Job = require("../models/job");
const { jobErrors } = require("../error_handler/error");
const Employer = require("../models/employer");
const User = require("../models/user");

exports.createJob = async (req, res) => {
    try {
        const employerId = req.user.id;
        
        let {title, category, location, keyword, description, address, jobType, workType} = req.body;
        const employer = await Employer.findOne({employerId});

        if(employer) {
            const job = await Job.create({ 
                companyName : employer.companyName,
                title, 
                category, 
                location, 
                keyword, 
                description, 
                address, 
                jobType, 
                workType
            });
            
            return res.status(201).json({
                status : "success",
                data : {
                    job
                }
            });
        }
    }catch (error) {
        console.log(error);
        const errors = jobErrors(error)
        res.status(404).json({ errors });
    }
};

exports.getJobs = async (req, res) => {
    try {
        let userId = req.user.id;

        const user = await User.findOne({userId});

        const jobRecommendations = await Job.find({category : user.skill});

        if(jobRecommendations) {
            return res.status(201).json({
                status : "success",
                message : "Below are jobs that suit you. Apply now!",
                data : {
                    jobRecommendations
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}
