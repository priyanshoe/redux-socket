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
    console.log(`IO connected with ID:${socket.id}`);
    socket.broadcast.emit("welcome", `Welcome to socket :${socket.id}`)
})


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
app.get('/', (req, res) => {
    return res.status(200).json({ message: "Routes working" })
})