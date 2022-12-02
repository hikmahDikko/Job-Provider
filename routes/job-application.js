const express = require("express");
const User = require("../models/user");
const jobApplicationController = require("../controllers/job-application");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

const { makeApplication, getAllApplications, getOneApplication, deleteOneApplication } = jobApplicationController;

router.post("/apply", auth(User), makeApplication);

router.get("/one", auth(User), getOneApplication);

router.get("/applications", auth(User), getAllApplications);

router.get("/:id", auth(User), deleteOneApplication);

module.exports = router;
