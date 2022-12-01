const express = require("express");
const Employer = require("../models/employer");
const jobController = require("../controllers/job");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

const { createJob } = jobController

router.post("/create", auth(Employer), createJob);

module.exports = router;
