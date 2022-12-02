const employerController = require("../controllers/employer");
const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const { uploadProfileImage, resizeImage } = require("../middleware/uploadImage");
const Employer = require("../models/employer")
const Admin = require("../models/user");

const router = express.Router();

const { signUpEmployer, signInEmployer,  getUser, getEmployer, deleteEmployer, updateEmployer } = employerController;

router.post("/signup", signUpEmployer);

router.post("/signin", signInEmployer);

router
    .route("/users/:id")
    .get(auth(Employer), getUser);

router
    .route("/:id")
    .get(auth(Employer), getEmployer)
    .get(auth(Employer), getUser)
    .patch(auth(Employer), uploadProfileImage, resizeImage, updateEmployer)
    .delete(auth(Admin), deleteEmployer);

module.exports = router;
