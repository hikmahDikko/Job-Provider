const userController = require("../controllers/user");
const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const { uploadProfileImage, resizeImage } = require("../middleware/uploadImage");
const User = require("../models/user");
const Admin = require("../models/user");

const router = express.Router();

const { signUpUser, signInUser,  getUser, deleteUser, updateUser } = userController;

router.post("/signup", signUpUser);

router.post("/signin", signInUser);

router
    .route("/:id")
    .get(auth(User), getUser)
    .patch(auth(User), uploadProfileImage, resizeImage, updateUser)
    .delete(auth(Admin), deleteUser);

module.exports = router;
