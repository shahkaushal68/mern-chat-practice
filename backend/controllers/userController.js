const { successResponse, failResponse } = require("../helpers/response");
const User = require("../models/userModel");


// Get All User and searching User
// /api/users?search=kaushal
const getAllUsers = async (req, res) => {
    try {
        //console.log("req", req.user);
        const keyword = req.query.search ?
            {
                $or: [
                    { userName: { $regex: req.query.search, $options: "i" } },
                    { email: { $regex: req.query.search, $options: "i" } }
                ]
            } : {}
        const allUsers = await User.find(keyword).find({ _id: { $ne: req.user.id } }).select("-password");
        res.send(successResponse("User Fetch Successfully", allUsers));
    } catch (error) {
        console.log("error---", error);
        res.send(failResponse(error));
    }
}

module.exports = { getAllUsers }