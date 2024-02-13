const express = require('express');
const router = express.Router();
const { register, login, loginUserDetails } = require('../controllers/authController');
const { checkToken } = require("../middlewares/authMiddleware");

router.post('/login', login);
router.post('/register', register);
router.get('/user-details', checkToken, loginUserDetails);

module.exports = router