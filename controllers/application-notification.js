const ApplicationNotification = require("../models/application-notification");
const JobApplication = require("../models/job-application");
const { getOne, getAll, deleteOne } = require("../controllers/generic");

exports.updateApplicationNotification = async (req, res) => {
    try {
        const applicationId = req.params.id;
    
        const jobApplication = await ApplicationNotification.findById({_id :  applicationId});

        if (!jobApplication) {
            return res.status(404).json({
                status: "fail",
                message : `There is no application with the ID ${jobApplication}`
            })
        } 

        await JobApplication.findByIdAndUpdate(applicationId, {
            status : req.body.status, 
        }); 

        await ApplicationNotification.findByIdAndUpdate(applicationId, {
            status : req.body.status, 
        }); 
    } catch (error) {
        console.log(error);
    }
};

exports.getAllApplicationNotifications = getAll(ApplicationNotification);

exports.getOneApplicationNotification = getOne(ApplicationNotification);

exports.deleteOneApplicationNotification = deleteOne(ApplicationNotification);