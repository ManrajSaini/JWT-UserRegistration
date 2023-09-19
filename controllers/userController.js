const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const User = require("../models/user");

dotenv.config();

const getRegisterForm = (req,res) => res.render('register');

const getLoginForm = (req,res) => res.render('login');

const getLogoutForm = async(req,res) => res.render('logout');

const getAllUsersForm = async(req,res) => res.render('allUsersForm');

const getSingleUserForm = async(req,res) => res.render('singleUserForm');


const registerUser = async(req,res) => {
    try {
        const userSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required(),
            firstName: Joi.string().min(2).max(20).required(),
            lastName: Joi.string().min(2).max(20).required(),
            orgName: Joi.string().min(2).max(50).required()
        });
        const { error }  = userSchema.validate(req.body);

        if(error) {
            const errorJson = {
                "success": false,
                "error_code": 404,
                "message": error.details[0].message,
                "data": null
            };

            return res.render('error', {errorJson});
        }

        const tempUser = await User.findOne({email: req.body.email.toLowerCase()});
        if(tempUser){
            const errorJson = {
                "success": false,
                "error_code": 404,
                "message": "User already exists, go to login",
                "data": null
            };

            return res.render('error', {errorJson});
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            email: req.body.email.toLowerCase(),
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            orgName: req.body.orgName
        });

        await user.save();

        return res.redirect("login");

    } catch (err) {
        const errorJson = {
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": null
        };

        return res.render('error', {errorJson});
    }
};


const loginUser = async(req,res) => {
    try {
        const userSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required()
        });
        const { error }  = userSchema.validate(req.body);

        if(error) {
            const errorJson = {
                "success": false,
                "error_code": 404,
                "message": error.details[0].message,
                "data": null
            };

            return res.render('error', {errorJson});
        }

        const user = await User.findOne({email: req.body.email.toLowerCase()});
        
        if(!user){
            const errorJson = {
                "success": false,
                "error_code": 404,
                "message": "User does not exist, go to register user",
                "data": null
            };

            return res.render('error', {errorJson});
        }

        const result = await bcrypt.compare(req.body.password, user.password);
        if(!result){
            const errorJson = {
                "success": false,
                "error_code": 404,
                "message": "Incorrect Password",
                "data": null
            };

            return res.render('error', {errorJson});
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        const successJson = {
            "success": true,
            "error_code": null,
            "message": "Login successful",
            "data": [user],
            "token": token
        };

        res.render('profile', {successJson});

    } catch (err) {
        const errorJson = {
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": null
        };

        return res.render('error', {errorJson});
    }
};


const logoutUser = async(req,res) => {

    return res.status(200).send({
        "success": true,
        "error_code": null,
        "message": "Logout successful",
        "data": null
    });
};


const fetchAllUsers = async(req,res) => {
    try{
        const users = await User.find();
        const successJson = {
            "success": true,
            "error_code": null,
            "message": "Login successful",
            "data": users
        };

        res.render('allUsers', {successJson});

    } catch(err){
        const errorJson = {
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": null
        };

        return res.render('error', {errorJson});
    }
};


const singleUser = async(req,res) => {
    try{
        const userID = req.user;
        const user = await User.findById(userID._id)

        if(!user){
            const errorJson = {
                "success": false,
                "error_code": 404,
                "message": "User does not exist",
                "data": null
            };

            return res.render('error', {errorJson});
        }

        const successJson = {
            "success": true,
            "error_code": null,
            "message": "Successfully fetched the user",
            "data": [user]
        };

        return res.render('singleUser', {successJson})

    } catch(err){
        const errorJson = {
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": null
        };

        return res.render('error', {errorJson});
    }
};

module.exports = {
    getRegisterForm,
    getLoginForm,
    getLogoutForm,
    getAllUsersForm,
    getSingleUserForm,
    registerUser,
    loginUser,
    logoutUser,
    fetchAllUsers,
    singleUser
}