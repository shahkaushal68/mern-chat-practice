const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const bcryptPass = async (password) => {
    return await bcrypt.hash(password, saltRounds);
}


const generateWebToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRETE_KEY, {
        expiresIn: "30d"
    });
}


module.exports = { bcryptPass, generateWebToken }