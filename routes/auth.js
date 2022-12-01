const authController = require("../controllers/auth");
const express = require("express");
const router = express.Router();
const { resetPassword, forgotPassword } = require("../middleware/passwordReset");

const { signUp, signIn } = authController;

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/forgot-password", forgotPassword);

router.patch("/reset-password/:token", resetPassword);

module.exports = router;