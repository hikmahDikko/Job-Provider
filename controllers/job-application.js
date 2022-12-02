const JobApplication = require("../models/job-application");
const QueryMethod = require("../utils/query");
const Job = require("../models/job");
const { getOne, getAll } = require("../controllers/generic");
const User = require("../models/user");

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
        const jobApplication = await JobApplication.findById(req.params.id);

        if (!jobApplication) {
            return res.status(404).json({
                status: "fail",
                message : `There is no application with the ID ${jobApplication}`
            })
        } 

        await JobApplication.findByIdAndUpdate(req.params.id, {
            status : req.body.status, 
        }); 
        res.status(201).json({
            status: "success",
            message : "Data successfully updated"
        })
    } catch (error) {
        console.log(error);
    }
};

exports.getAllApplications = async (req, res) => {
    try {
        const employerId = req.user.id;
        const job = await Job.find({employerId});

        if(job) {
            let queriedUsers = new QueryMethod(JobApplication.find({}), req.query)
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
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
};

exports.getOneApplication = getOne(JobApplication);

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

exports.deleteOneApplication = async (req, res) => {
    try {
        const del = await JobApplication.findByIdAndDelete({_id : req.params.id});

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