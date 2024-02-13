const express = require('express');
const router = express.Router();
const { accessChat, fetchChats, createGroupChat, renameGroupChat, addMember, removeMember } = require('../controllers/chatController');
const { checkToken } = require('../middlewares/authMiddleware');

router.post('/', checkToken, accessChat);   //Access or Create New Chat
router.get('/', checkToken, fetchChats);    // Fetch particular User chat
router.post("/group", checkToken, createGroupChat);
router.put("/group/rename", checkToken, renameGroupChat);
router.put("/group/add", checkToken, addMember);
router.put("/group/remove", checkToken, removeMember);

module.exports = router