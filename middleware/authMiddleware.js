const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const { JWT_SECRET, JWT_EXPIRY } = process.env;

exports.generateToken = (id) => jwt.sign(
    {id},
    JWT_SECRET,
    {expiresIn : JWT_EXPIRY}
);

//Authorization middleware
exports.auth = (model) => {
    return async (req, res, next) => {
        let token;

        if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token){
            return res.status(403).json({
                status : "fail",
                message : "User not login"
            });
        }
        const verifyJWT = await jwt.verify(token, JWT_SECRET, {expiresIn : JWT_EXPIRY});

        const currentUser = await model.findById(verifyJWT.id);

        req.user = currentUser;

        next();
    };
}

//Check user's role
exports.checkRole = (...roles) => {
    return async (req, res, next) => {
        if(!req.user.role.includes(...roles))
        return res.status(401).json({
            status : 'fail',
            message : "You're not authorized to perform this action."
        });

        next();
    };
};


//Check user skills for job recommendation
exports.checkSkill = async (...skills) => {
    if(!req.user.skill.includes(...skills)) {
        return res.status(200).json({
            message : "No job recommendation for now! Please try again"
        })
    }
    next();
}