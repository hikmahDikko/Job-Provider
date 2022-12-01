const employerController = require("../controllers/employer");
const express = require("express");
const { auth, checkRole } = require("../middleware/authMiddleware");
const { uploadProfileImage, resizeImage } = require("../middleware/uploadImage");
const Employer = require("../models/employer")

const router = express.Router();

const { signUpEmployer, signInEmployer,  getEmployer, deleteEmployer, updateEmployer } = employerController;

router.post("/signup", signUpEmployer);

router.post("/signin", signInEmployer);

router
    .route("/:id")
    .get(auth(Employer), getEmployer)
    .patch(auth(Employer), uploadProfileImage, resizeImage, updateEmployer)
    .delete(auth(Employer), checkRole("admin"), deleteEmployer);

module.exports = router;
