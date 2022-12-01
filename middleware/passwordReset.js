const User = require("../models/user");
const crypto = require("crypto");
const sendEmail = require("../utils/email");
const Token = require("../models/token");
const bcrypt = require("bcrypt");

const requestPasswordReset = async (req) => {
    try{
        const user = await User.findOne({email : req.body.email});
        
        if (!user) return ({message : "User does not exist"});
        let resetToken = crypto.randomBytes(32).toString("hex");
        const tokenReset = await new Token({
            userId: user._id,
            token: resetToken,
            createdAt: Date.now(),
        }).save();

        const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auths/reset-password/${resetToken}`;
        const message = `To reset your password click on the link below to submit your new password: ${resetUrl}`;

        await sendEmail({
            email : user.email,
            subject : "Your password reset token. It's valid for two minutes",
            message,
            text : resetUrl
        })

        return ({
            status: "success",
            message: "Password reset url sent to your mail",
            resetUrl
        });
    }catch (error) {
        console.log(error);
    }
}

const resetPass = async (userId, token, password) => {
    try{
        const passwordResetToken = await Token.findOne({ userId });
        if (!passwordResetToken) {
            return ({"message" : "Invalid or expired password reset token"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
            await User.updateOne(
                { _id: userId },
                { $set: { password: hash, confirmPassword: hash } },
                { new: true }
            );
    
        return ({"message" : "You have successfully updated your Password."});
    } catch (error) {
        console.log(error)
    }
};

exports.forgotPassword = async (req, res, next) => {
    try{
        const forgotPASS = await requestPasswordReset(
            req
        );
        return res.status(200).json({forgotPASS});
    } catch (error) {
        console.log(error);
        res.status(400).json({message : error});
    }
};
  
exports.resetPassword = async (req, res, next) => {
    try{
        const resetPasswordService = await resetPass(
            req.body.userId,
            req.params.token,
            req.body.password,
            req.body.confirmPassword
        );
        
        if(req.body.password.length < 6 || req.body.password !== req.body.confirmPassword) {
            return res.status(400).send("Ensure password and confirm password are of the same characters, nothing less than 6 characters");
        }
        res.status(200).json(resetPasswordService);

        let token = await Token.findOne({ userId: req.body.userId});
        if (token) await token.deleteOne();

    } catch (error) {
        console.log(error);
        res.status(400).json({message : error});
    }
};
