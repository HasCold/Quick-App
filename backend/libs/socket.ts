import { Server, Socket } from "socket.io";

export function setUpSocket(io: Server){

io.on("connection", (socket: Socket) => {
    console.log("User connected !", socket.id);
    
    socket.on("disconnect", () => {
        console.log(`${socket.id} is disconnected ...`);
    })
})
}