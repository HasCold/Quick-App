import { Server} from "socket.io";
import { CustomSocket } from "../types/index.js";

export const socketMiddleware = (io: Server) => {
    io.use(async (socket: CustomSocket, next) => {
        try {
            console.log("HandShake Instance :- ", socket.handshake);
            
            // This object contains some details about the handshake that happens at the beginning of the Socket.IO session.
            const room = socket.handshake.auth.room || socket.handshake.headers.room;
            if(!room){
                return next(new Error("Please provide room id"));
            }

            socket.room = room;
            next();

        } catch (error: any) {
            next(new Error("Unknown User"))
        }
    })
}