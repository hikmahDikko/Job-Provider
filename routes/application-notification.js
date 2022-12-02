const express = require("express");
const Employer = require("../models/user");
const applicationNotificationController = require("../controllers/application-notification");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

const { updateApplicationNotification, 
        getAllApplicationNotifications, 
        getOneApplicationNotification, 
        deleteOneApplicationNotification 
} = applicationNotificationController;

router.route("/:id")
    .patch(auth(Employer), updateApplicationNotification)
    .get(auth(Employer), deleteOneApplicationNotification);

router.get("/one", auth(Employer), getOneApplicationNotification);

router.get("/applications", auth(Employer), getAllApplicationNotifications);

module.exports = router;
