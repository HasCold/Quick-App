import { Server } from "socket.io";
import { socketMiddleware } from "../middlewares/Socket.Middleware.js";
import { CustomSocket, MessageType } from "../types/index.js";
import { joinRooms } from "./joinRooms.js";
import prisma from "../config/db.config.js";

export function setUpSocket(io: Server){
    // Middleware inject
    socketMiddleware(io)

io.on("connection", (socket: CustomSocket) => {

    // join the rooms
    joinRooms(socket);        

    console.log("User connected !", socket.id);
    
    socket.on("message", async (data: MessageType) => {
        console.log("Received message from user:", data);
        await prisma.chats.create({
            data: data,
        });

        socket.to(socket.room!).emit("message", data)
    });

    // server-msg is for dummy purpose
    socket.on("server-msg", (data: any) => {
        socket.broadcast.emit("server-msg", {data, str: "Hello, World"});
    });
    
    socket.on("error", (err) => {
        console.error(`Error on socket ${socket.id}`, err);
    });

    socket.on("disconnect", () => {
        console.log(`${socket.id} is disconnected ...`);
    });
});
}

// Docs :- https://socket.io/docs/v4/rooms/

// io.emit("recieve-message", data); / socket.emit("recieve-message", data);  // This message will send everyone and also including me
// socket.broadcast.emit("recieve-message", data);  // This message will send everyone but except me
// OR both will work as same io / socket