import express from "express"
import dotenv from "dotenv";
import { createServer } from "http"
import { Server } from "socket.io";
dotenv.config();
const PORT = process.env.SERVER_PORT || 4176;

const app = express();

// socketIO connection
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }

});

io.on("connection", (socket) => {
    console.log(`socket connected with ID:${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`socket disconnected with ID:${socket.id}`);
    })

    socket.on('logIn', (user) => {
        socket.join(user)
        console.log(`${user} joined the server with ID:${socket.id}`);
    })

    socket.on('join', (user) => {
        socket.join(user)
        console.log(`user joined ${user}`);


    })

    socket.on('new-message', ({ newMsg, receiver, userName }) => {
        console.log("message received ", newMsg, receiver, userName);
        socket.to(receiver).emit("message-received", { newMsg, sender: userName, receiver })

    })



    // socket.broadcast.emit("welcome", `${socket.id} joined the server`)
})


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
app.get('/', (req, res) => {
    return res.status(200).json({ message: "Routes working" })
})