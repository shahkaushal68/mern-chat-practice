const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    image: {
        type: String,
        //default: "https://cdn-icons-png.flaticon.com/512/2919/2919906.png"
    }

},
    {
        timestamps: true
    });

const User = mongoose.model('User', userSchema);

module.exports = User