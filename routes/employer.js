const employerController = require("../controllers/employer");
const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const { uploadProfileImage, resizeImage } = require("../middleware/uploadImage");
const Employer = require("../models/employer");
const {Admin, User} = require("../models/user");
const { confirmData, check } = require("../middleware/confirm-data");

const router = express.Router();

const { 
    signUpEmployer, 
    signInEmployer,  
    getUser, 
    getEmployer, 
    deleteEmployer, 
    updateEmployer 
} = employerController;

router.post("/signup", signUpEmployer);

router.post("/signin", signInEmployer);

router
    .route("/employees/:id")
    .get(auth(Employer), confirmData(User), getUser);

router
    .route("/:id")
    .get(auth(Employer), confirmData(Employer), getEmployer)
    .patch(auth(Employer), check(Employer), uploadProfileImage, resizeImage, updateEmployer)
    .delete(auth(Admin), deleteEmployer);

module.exports = router;
