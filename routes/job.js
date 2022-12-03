const express = require("express");
const Employer = require("../models/employer");
const Job = require("../models/job");
const User = require("../models/user");
const jobController = require("../controllers/job");
const { auth } = require("../middleware/authMiddleware");
const { check } = require("../middleware/confirm-data");
const router = express.Router();

const { 
    createJob, 
    getJobRecommendations, 
    getMyJobs, 
    getAllJobs, 
    updateOneJob, 
    deleteOneJob,
    getOneJob  
} = jobController

router.post("/create", auth(Employer), createJob);

router.get("/", auth(User), getJobRecommendations);

router.get("/all", auth(User), getAllJobs);

router.route("/my-job")
    .get(auth(Employer), getMyJobs);

router.route("/:id")
    .get(auth(Employer), check(Employer), getOneJob)
    .patch(auth(Employer), check(Employer), updateOneJob)
    .delete(auth(Employer), check(Employer), deleteOneJob);

module.exports = router;
