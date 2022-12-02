const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const employerRoutes = require("./routes/employer");
const jobRoutes = require("./routes/job");
const jobApplicationRoutes = require("./routes/job-application");
const express = require ("express");
const cookieParser = require( "cookie-parser");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(express.json());

app.use(cookieParser());

var accessLogStream = fs.createWriteStream(path.join("utils", 'log_file.log'), {
    flags : 'a'
});

app.use(morgan('dev', { stream : accessLogStream }));

app.use("/api/v1/auths", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/employers", employerRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/applications", jobApplicationRoutes);

module.exports = app;