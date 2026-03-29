
import { Server } from "socket.io";


export default function connectSocket(server) {


    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log(`Socket connected with ID:${socket.id}`);
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
    })
}