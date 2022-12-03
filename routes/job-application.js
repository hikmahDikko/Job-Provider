const express = require("express");
const User = require("../models/user");
const Job = require("../models/job");
const Employer = require("../models/employer");
const jobApplicationController = require("../controllers/job-application");
const { auth } = require("../middleware/authMiddleware");
const { confirmData } = require("../middleware/confirm-data");
const JobApplication = require("../models/job-application");
const router = express.Router();

const { createJobApplication, 
    getAllApplications, 
    getMyJobApplications,
    getOneApplication, 
    getJobApplication, 
    deleteOneApplication,
    updateJobStatus 
} = jobApplicationController;

router.get('/notification', auth(Employer), getAllApplications);

router.route("/")
    .post(auth(User), createJobApplication)
    .get(auth(User), getMyJobApplications);;

router.route("/users/:id")
    .get(auth(Employer), confirmData(JobApplication), getJobApplication)
    .delete(auth(Employer), confirmData(JobApplication), deleteOneApplication)
    .patch(auth(Employer), confirmData(JobApplication), updateJobStatus);

router.route("/:id")
    .get(auth(User), confirmData(JobApplication), getOneApplication);
    
module.exports = router;
