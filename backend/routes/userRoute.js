const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const { checkToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', checkToken, getAllUsers);


module.exports = router