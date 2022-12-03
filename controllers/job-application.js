const JobApplication = require("../models/job-application");
const QueryMethod = require("../utils/query");
const Job = require("../models/job");
const Employer = require("../models/employer");
const { getOne, getAll, deleteOne } = require("../controllers/generic");

exports.createJobApplication = async (req, res) => {
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
                employerId: job.employerId,
                jobId, 
                status
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

exports.updateJobStatus = async (req, res) => {
    try {
        const employerId = req.user.id;

        const employer = await JobApplication.find({employerId});

        if (employer) {
            await JobApplication.findByIdAndUpdate(req.params.id, {
                status : req.body.status, 
            }); 
            return res.status(201).json({
                status: "success",
                message : "Data successfully updated"
            })
        }else {
            return res.status(201).json({
                message : "Bad Request!"
            })
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getAllApplications = async (req, res) => {
    try {
        const employerId = req.user.id;

        let queriedUsers = new QueryMethod(JobApplication.find({employerId}), req.query)
        .sort()
        .filter()
        .limit()
        .paginate();
        let datas = await queriedUsers.query;
        res.status(200).json({
            status: "success",
            results: datas.length,
            datas
        });    
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
};

exports.getJobApplication = async (req, res) => {
    try {
        const employerId = req.user.id;

        const jobs = await Job.findOne({employerId});

        if(jobs) {
            const application = await JobApplication.findById(req.params.id);
            return res.status(200).json({
                status : "success",
                data : {
                    application
                }
            })
        } else {
            return res.status(401).json({
                message: "You're not authorized to perform this action"
            })
        }
    } catch (error) {
        console.log(error)
    }
};

exports.getOneApplication = async (req, res) => {
    try {
        const userId = req.user.id;

        const application = await JobApplication.findById(req.params.id);

        if (userId !== application.userId) {
            return res.status(401).json({
                message: "You're not authorized to perform this action"
            })
        } else { 
            return res.status(200).json({
                status : "success",
                data : {
                    application
                }
            })
        }

    } catch (error) {
        console.log(error)
    }
};

exports.getMyJobApplications = async (req, res) => {
    try {
        const userId = req.user.id;
        const application = await JobApplication.find({userId});

        res.status(201).json({
            status : "success",
            message : "Your job applications are as follows",
            results : application.length,
            data : {
                application
            }
        });
    } catch (error) {
        console.log(error);
    }
}

exports.deleteOneApplication = deleteOne(JobApplication);