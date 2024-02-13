const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require("cors");

const app = express();

//default Middleware
app.use(express.json({ extended: true })); // for postman //Used to parse JSON bodies
app.use(cors()); //Middleware for connect server and react (used for server connection with unknown url)
app.use(express.urlencoded({ extended: true })); //for send the data via form //Parse URL-encoded bodies
//app.use(cookieParser());

const port = process.env.PORT || 5050;

//Databae Connection
mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(console.log("Connection Successfully"))
    .catch((error) => console.log(error));

//Routing
app.use('/api', require("./routes/allRoute"));

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173"
    },
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("setup", (userData) => {
        //console.log({ userData });
        socket.join(userData?._id);

    });

    socket.on("join_chat", (room) => {
        socket.join(room);
        console.log("user Joined room " + room);
    });

    socket.on("new_message", (newMessageReceive) => {
        //console.log("newMessageReceive-----------", { newMessageReceive });
        const chat = newMessageReceive.chat;
        if (!chat.users) return console.log("chat.users not present");

        chat.users.forEach(user => {
            //console.log({ user });
            if (user._id === newMessageReceive.sender._id) return;
            socket.in(user._id).emit("receive_message", newMessageReceive);
        });

    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


