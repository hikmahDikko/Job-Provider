const express = require("express");
const Employer = require("../models/employer");
const User = require("../models/user");
const jobController = require("../controllers/job");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

const { createJob, getJobRecommendations, getMyJobs, getAllJobs } = jobController

router.post("/create", auth(Employer), createJob);

router.get("/", auth(User), getJobRecommendations);

router.get("/all", auth(User), getAllJobs);

router.get("/my-job", auth(Employer), getMyJobs);

module.exports = router;
