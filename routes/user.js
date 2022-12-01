const userController = require("../controllers/user");
const express = require("express");
const { auth, checkRole } = require("../middleware/authMiddleware");
const { uploadProfileImage, resizeImage } = require("../middleware/uploadImage");

const router = express.Router();

const { getUser, getUsers, deleteUser, updateUser } = userController;

router.get("/", auth, checkRole("employer"), getUsers);

router
    .route("/:id")
    .get(auth, getUser)
    .patch(auth, uploadProfileImage, resizeImage, updateUser)
    .delete(auth, checkRole("employer"), deleteUser);

module.exports = router;
