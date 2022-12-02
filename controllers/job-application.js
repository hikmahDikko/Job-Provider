const JobApplication = require("../models/job-application");
const Job = require("../models/job");
const ApplicationNotification = require("../models/application-notification");
const { getOne, getAll } = require("../controllers/generic");

exports.makeApplication = async (req, res) => {
    try {
        const userId = req.user.id;
    
        const { jobId, status } = req.body;

        const job = await Job.findOne({jobId});

        if (!job) {
            return res.status(404).json({
                status: "fail",
                message : `There is no job with the ID ${jobId}`
            })
        } 

        const user = await JobApplication.findOne({userId, jobId});

        if(!user) {
            const jobApplication = await JobApplication.create({
                userId,
                jobId, 
                status
            });

            await ApplicationNotification.create({
                userId,
                applicationId : jobApplication._id
            });

            return res.status(201).json({
                status : "success",
                message : "You have successfully applied for the job",
                data : {
                    jobApplication
                }
            });
        } else {
            return res.status(201).json({
                message : "You have successfully applied for the job",
            });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getAllApplications = getAll(JobApplication);

exports.getOneApplication = getOne(JobApplication);

exports.deleteOneApplication = async (req, res) => {
    try {
        const del = await JobApplication.findByIdAndDelete({_id : req.params.id});

        await ApplicationNotification.findByIdAndDelete({_id : req.params.id});

        if(del) {
            return res.status(204).send();
        }else{
            return res.status(404).send({
                status : false,
                message : "Data cannot be fetched"
            })
        }
    }catch (err) {
        console.log(err)
    }
};