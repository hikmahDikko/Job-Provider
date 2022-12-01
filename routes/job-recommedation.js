const express = require("express");
const router = express.Router();
const { jobRecommendations } = require("../controllers/job-recommendation");
const { auth } = require("../middleware/authMiddleware");
const User = require("../models/user");

router.get("/", auth(User), jobRecommendations);

module.exports = router;
