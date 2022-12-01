const Job = require("../models/job");
const { jobErrors } = require("../error_handler/error");
const Employer = require("../models/employer");

exports.createJob = async (req, res) => {
    try {
        const employerId = req.user.id;
        const company = await Employer.findById({_id : employerId})
        let payload = req.body;
    
        const job = await Job.create({
            employerId : employerId,
            companyName : company.companyName, 
            ...payload 
        });
        
        res.status(201).json({
            status : "success",
            data : {
                job
            }
        });
    }catch (error) {
        console.log(error);
        const errors = jobErrors(error)
        res.status(404).json({ errors });
    }
}
