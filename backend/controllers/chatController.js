const { successResponse, validationError, failResponse } = require("../helpers/response");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");


// One to One chat between two user
// Check first isChat available between this particular two result. If No then create new chat

const accessChat = async (req, res) => {
    if (!req.body.userID) return res.send(validationError("Please pass the userId first!"));
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user.id } } },
            { users: { $elemMatch: { $eq: req.body.userID } } }
        ]
    })
        .populate({ path: 'users', select: '-password' })
        .populate("latestMessage");

    // isChat = await User.populate(isChat, {
    //     path: 'latestMessage.sender', select: 'name, email'
    // })

    //console.log("accessChat--------------------", isChat[0]);
    if (isChat.length > 0) {
        res.send(successResponse("Chat Successfully Fetch", isChat[0]))
    } else {
        const createChatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user.id, req.body.userID]
        }
        try {
            const createChat = await Chat.create(createChatData);
            const getChat = await Chat.findById(createChat?._id).populate({
                path: "users",
                select: "-password"
            });


            //console.log("crateChat---------------------", createChat);
            res.send(successResponse("Chat Successfully Created", getChat))
        } catch (error) {
            console.log("create chat error", error);
        }
    }

}

// Fetch All Chats of those particular Login user
const fetchChats = async (req, res) => {
    try {
        const getChats = await Chat.find({
            users: { $elemMatch: { $eq: req.user.id } }
        }).populate([
            {
                path: "users",
                select: "-password"
            },
            {
                path: "latestMessage",
                populate: ([
                    {
                        path: "sender",
                        select: "-password"
                    },
                    {
                        path: "chat"
                    }
                ])
            }
        ]);
        res.send(successResponse("fetch All Chats successfully", getChats))
    } catch (error) {
        console.log("fetch chats error", error);
        res.send(failResponse(error))
    }
}

// Create a Group Chat
const createGroupChat = async (req, res) => {
    if (!req.body.name && !req.body.users) return res.send(validationError("Please Enter Chatname or Add User"));
    let users = JSON.parse(req.body.users);
    users.push(req.user.id);
    if (users.length <= 2) return res.send(validationError("Please Add atleast 2 or more users add in group chat"));
    try {
        const groupChat = await Chat.create({
            chatName: req.body.chatName,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user.id
        });
        const findChat = await Chat.findById(groupChat?._id);
        res.send(successResponse("Group chat created successfully", findChat));
    } catch (error) {
        console.log("group chat creation error", error);
        res.send(failResponse(error))
    }
}

// Rename group chat
const renameGroupChat = async (req, res) => {
    const { chatId, chatName } = req.body
    //console.log(req.body);
    try {
        const renameChat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
        res.send(successResponse("Rename group chat", renameChat))
    } catch (error) {
        console.log("rename group chat error", error);
        res.send(failResponse(error));
    }
}
// Add user to the group
const addMember = async (req, res) => {
    const { chatId, userId } = req.body;
    try {
        const addUser = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
        res.send(successResponse("user Added in the group", addUser));
    } catch (error) {
        console.log("add group chat error", error);
    }
}
// Remove user from the group
const removeMember = async (req, res) => {
    const { chatId, userId } = req.body;
    try {
        const removeUser = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
        res.send(successResponse("user remove from the group", removeUser))
    } catch (error) {
        console.log("remove from group chat error", error);
    }
}

module.exports = { accessChat, fetchChats, createGroupChat, renameGroupChat, addMember, removeMember }