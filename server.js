const mongoose = require("mongoose");
require("dotenv").config({path : "./config.env"});
const { DB_URL, PORT } = process.env;

const app = require("./app.js");

mongoose.connect(DB_URL)
    .then(() => console.log('conneted to database'))  
    .catch(error => console.log(error));

app.listen(PORT, () => {
    console.log("Hello from port " + PORT);
});