const express = require('express');
const router = express.Router();

const authRouter = require("./authRoute");
const userRouter = require("./userRoute");
const chatRouter = require("./chatRoute");
const messageRouter = require("./messageRoute");

router.use('/v1/auth', authRouter);
router.use('/v1/users', userRouter);
router.use("/v1/chat", chatRouter);
router.use("/v1/message", messageRouter)

module.exports = router