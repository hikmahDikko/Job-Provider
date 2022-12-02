const express = require("express");
const User = require("../models/user");
const Employer = require("../models/employer");
const jobApplicationController = require("../controllers/job-application");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

const { makeApplication, 
    getAllApplications, 
    getMyJobApplications,
    getOneApplication, 
    deleteOneApplication,
    updateJobStatus 
} = jobApplicationController;

router.get('/notification', auth(Employer), getAllApplications);

router.route("/")
    .post(auth(User), makeApplication)
    .get(auth(User), getMyJobApplications);;

router.route("/:id")
    .get(auth(Employer), getOneApplication)
    .patch(auth(Employer), updateJobStatus);

router.route("/:id")
    .get(auth(User), getOneApplication)
    .delete(auth(User), deleteOneApplication);

module.exports = router;
