const userController = require("../controllers/user");
const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const { uploadProfileImage, resizeImage } = require("../middleware/uploadImage");
const User = require("../models/user");
const Admin = require("../models/user");
const { confirmData, check } = require("../middleware/confirm-data");

const router = express.Router();

const { 
    signUpUser, 
    signInUser,  
    getUser, 
    getUsers, 
    deleteUser, 
    updateUser 
} = userController;

router.post("/signup", signUpUser);

router.post("/signin", signInUser);

router.get("/", auth(Admin), getUsers);

router
    .route("/:id")
    .get(auth(User), confirmData(User), getUser)
    .patch(auth(User), check(User), uploadProfileImage, resizeImage, updateUser)
    .delete(auth(Admin), deleteUser);

module.exports = router;
