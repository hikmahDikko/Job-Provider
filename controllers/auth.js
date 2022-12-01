const User = require('../models/user');
const { authErrors } = require("../error_handler/error");
const { generateToken } = require("../middleware/authMiddleware");
require("dotenv").config();
const { MAX_AGE } = process.env;
const Token = require("../models/token");
const bcrypt = require("bcrypt");


exports.signUp = async (req, res) => {
    try {
        const {firstName, lastName, middleName, email, password, confirmPassword, skill, location, experience, } = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({message : "Wrong Password Confirmation input"})
        }

        const salt = await bcrypt.genSalt(10);    
        
        if(password === confirmPassword && password.length > 7){
            const hash = await bcrypt.hash(password, salt);
            const user = await User.create({ 
                firstName, 
                lastName, 
                middleName, 
                email, 
                password : hash, 
                skill, 
                location, 
                experience 
            });
            
            const token = generateToken(user._id);
            res.cookie('jwt', token, {httpOnly: true, MAX_AGE: MAX_AGE * 1000 })
            return res.status(201).json({
                status : "success",
                token,
                data : {
                    user
                }
            });
        }
        return res.status(400).json({message : "Password is less than 8 characters"})
    }catch (error) {
        const errors = authErrors(error)
        res.status(404).json({ errors });
    }
    
}

exports.signIn = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if(!user) {
            res.status(401).json({
                status: "fail",
                message: "Invalid email or password",
            });
        }

        if(user) {
            const auth = await bcrypt.compare(password, user.password);
            if(auth) {
                const token = await generateToken(user._id);
                res.cookie('jwt', token, {httpOnly: true, MAX_AGE: MAX_AGE * 1000 })
                res.status(200).json({
                  status: "success",
                  token,
                  data: {
                    user,
                  },
                });    
        }else {
            res.status(401).json({
                status: "fail",
                message: "Invalid email or password",
                });
            }
        }
    }catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    } 
}

