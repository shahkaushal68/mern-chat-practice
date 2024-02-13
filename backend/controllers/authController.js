const bcrypt = require('bcryptjs');
const { failResponse, successResponse, validationError } = require("../helpers/response");
const User = require("../models/userModel");
const { bcryptPass, generateWebToken } = require("../utils/helpers");

const register = async (req, res) => {
    try {
        const isUserAlreadyRegister = await User.findOne({ email: req.body.email });
        if (isUserAlreadyRegister) return res.send(validationError("This user is already register"));
        const bcryptPassresponse = await bcryptPass(req.body.password);
        const userResponse = await new User({ ...req.body, password: bcryptPassresponse }).save();
        const token = generateWebToken(userResponse?._id);
        res.send(successResponse("register successfully", { userResponse, token }));
    } catch (error) {
        res.send(failResponse(error));
    }
}

const login = async (req, res) => {
    try {
        const isUserRegister = await User.findOne({ email: req.body.email });
        if (!isUserRegister) return res.send(validationError("This user is not register yet"));
        const isComaprePass = bcrypt.compare(req.body.password, isUserRegister?.password);
        if (!isComaprePass) return res.send(validationError("Password is not match"));
        if (isUserRegister && isComaprePass) {
            const token = generateWebToken(isUserRegister?._id);
            res.send(successResponse("Login successfully", { isUserRegister, token }));
        }

    } catch (error) {
        //console.log("error", error);
        res.send(failResponse(error));
    }
}

const loginUserDetails = async (req, res) => {
    try {
        console.log(req.user.id);
        const getUserDetails = await User.findById(req.user.id).select("-password");
        res.send(successResponse("login user detail fetch successfully", getUserDetails));
    } catch (error) {
        //console.log("error", error);
        res.send(failResponse(error));
    }
}

module.exports = { register, login, loginUserDetails }