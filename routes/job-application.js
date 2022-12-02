const express = require("express");
const User = require("../models/user");
const jobApplicationController = require("../controllers/job-application");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

const { makeApplication, 
    getAllApplications, 
    getOneApplication, 
    deleteOneApplication 
} = jobApplicationController;

router.post("/", auth(User), makeApplication);

router.get("/one", auth(User), getOneApplication);

router.get("/all", auth(User), getAllApplications);

router.delete("/:id", auth(User), deleteOneApplication);

module.exports = router;
