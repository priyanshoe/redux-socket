import { io } from "socket.io-client"
// export function connectSocket() {
//     return io("http://localhost:3030")
// }

export const socket = io("http://localhost:3030")