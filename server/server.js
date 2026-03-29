import express from "express";
import { createServer } from "http";
import connectSocket from "./src/socket/connect.socket.js"
import cookieParser from "cookie-parser";

// CONFIG ENV
// import dotenv from "dotenv";
// dotenv.config();
const PORT = process.env.SERVER_PORT || 4176;

//  CREATE SERVER (EXPRESS => SOCKET)
const app = express();
const server = createServer(app);
connectSocket(server)

// MIDDLEWARES
app.use(express.json())
app.use(cookieParser())

// START SERVER
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
// CHECK ROUTE
app.get('/', (req, res) => {
    return res.status(200).json({ message: "Routes working" })
})

// AUTH ROUTES
import authRouts from "./src/routes/auth.routes.js"
app.use('/api/auth', authRouts)

// UTILS ROUTE
import utilsRouts from "./src/routes/utils.routes.js"
app.use('/api', utilsRouts)
