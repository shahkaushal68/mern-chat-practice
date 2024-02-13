const express = require('express');
const router = express.Router();
const { checkToken } = require("../middlewares/authMiddleware");
const { sendMessage, fetchAllMessagesBasedOnchatId } = require('../controllers/messageController');

router.post('/send-message', checkToken, sendMessage);
router.get("/:chatId", checkToken, fetchAllMessagesBasedOnchatId);

module.exports = router