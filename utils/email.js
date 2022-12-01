const nodemailer = require("nodemailer");
require("dotenv").config();
const { EMAIL_PASS, HOST_EMAIL } = process.env;

const sendEmail = async (options) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: HOST_EMAIL,
            pass: EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: HOST_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent : " + info.response);
        }
    });
};

module.exports = sendEmail;
