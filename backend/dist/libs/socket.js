import { socketMiddleware } from "../middlewares/Socket.Middleware.js";
import { joinRooms } from "./joinRooms.js";
export function setUpSocket(io) {
    socketMiddleware(io);
    io.on("connection", (socket) => {
        // join the rooms
        joinRooms(socket);
        console.log("User connected !", socket.id);
        socket.on("sent-message", (data) => {
            console.log("Received message from user:", data);
            socket.broadcast.emit("server-msg", { data, str: "Hello, World" });
            io.to(socket.room).emit("message", data);
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
