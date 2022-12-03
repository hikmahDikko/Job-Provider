const Job = require("../models/job");
const { jobErrors } = require("../error_handler/error");
const Employer = require("../models/employer");
const User = require("../models/user");
const { getAll, getOne, updateOne, deleteOne } = require("../controllers/generic");

exports.createJob = async (req, res) => {
    try {
        const payload = req.body;

        const job = await Job.create({ 
            ...payload
        });
        
        return res.status(201).json({
            status : "success",
            data : {
                job
            }
        });
    }catch (error) {
        const errors = jobErrors(error)
        res.status(404).json({ errors });
    }
};

exports.getAllJobs = getAll(Job);

exports.getOneJob = getOne(Job);

exports.deleteOneJob = deleteOne(Job);

exports.updateOneJob = async (req, res) => {
    try {
        const payload = req.body;

        const updatedData = await Job.findByIdAndUpdate(req.params.id, ...payload);

        res.status(200).json({
          status: "success",
          data: {
            updatedData
          },
        });
    } catch (error) {
        const errors = jobErrors(error)
        res.status(404).json({ errors });
    }
};

exports.getJobRecommendations = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const user = await User.findById({_id : userId});
        
        const jobRecommendations = await Job.find({category : user.skill, workExperience : user.workExperience});

        if(jobRecommendations) {
            return res.status(201).json({
                status : "success",
                message : "Below are jobs that suit you. Apply now!",
                results : jobRecommendations.length,
                data : {
                    jobRecommendations
                }
            })
        }
        res.status(201).json({
            status : "success",
            message : "Check back later"
        })
    } catch (error) {
        console.log(error);
    }
};


exports.getMyJobs = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const jobs = await Job.find({employerId : userId});

        if(jobs) {
            return res.status(201).json({
                status : "success",
                message : "Below are your jobs",
                results : jobs.length,
                data : {
                    jobs
                }
            })
        }
        res.status(201).json({
            status : "success",
            message : "No job from you!"
        })
    } catch (error) {
        console.log(error);
    }
}
