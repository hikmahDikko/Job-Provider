const express = require("express");
const Employer = require("../models/employer");
const User = require("../models/user");
const jobController = require("../controllers/job");
const { auth, checkRole } = require("../middleware/authMiddleware");
const router = express.Router();

const { createJob, getJobs } = jobController

router.post("/create", auth(Employer), checkRole("employer"), createJob);

router.get("/", auth(User), getJobs);

module.exports = router;
