const { successResponse, failResponse } = require("../helpers/response");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");


const sendMessage = async (req, res) => {
    //console.log(req.user, req.body);
    const sendMessageData = {
        sender: req.user.id,
        content: req.body.content,
        chat: req.body.chatId
    }
    try {
        let sendMesageResponse = await Message.create(sendMessageData);
        sendMesageResponse = await sendMesageResponse.populate([
            {
                path: "sender",
                select: "-password"
            },
            {
                path: "chat",
                populate: {
                    path: "users",
                    select: "-password"
                }
            }
        ])
        //console.log("sendMessage", sendMesageResponse);
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: sendMesageResponse
        });
        res.send(successResponse("Send Message successfully!", sendMesageResponse));
    } catch (error) {
        //console.log("send message error", error);
        res.send(failResponse(error));
    }

}

const fetchAllMessagesBasedOnchatId = async (req, res) => {
    try {
        const fetchMessages = await Message.find({ chat: req.params.chatId })
            .populate([
                {
                    path: "sender",
                    select: "-password"
                },
                {
                    path: "chat"
                }
            ]);
        res.send(successResponse("Fetch All Meesages successfully", fetchMessages));
    } catch (error) {
        //console.log("Fetch All Messages", error);
        res.send(failResponse(error))
    }
}


module.exports = { sendMessage, fetchAllMessagesBasedOnchatId }