const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/connect')
const userRoute = require('./routes/user')
const messagerRoute = require('./routes/message')
const chatRoute = require('./routes/chat')
const cors = require('cors')
const { emit } = require('./models/user')


const app = express()

// db connecting 
dotenv.config()


// middleware
app.use(express.json())
app.use(cors())


// routes 
app.use('/user', userRoute)
app.use('/message', messagerRoute)
app.use('/chat', chatRoute)

const port = process.env.PORT


const server = app.listen(port, async () => {
    await connectDB()
    console.log(`server started....${port}`);
})


const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
    },
});


io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData._id)
        socket.emit("connected")
    })

    socket.on("join chat", (room) => {
        socket.join(room)
    })

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat

        if (!chat.users) return console.log('chat.users not defined')

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved)
        })
    })
}); 