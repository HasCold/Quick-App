import { CustomSocket } from "../types/index.js";

export const joinRooms = (socket: CustomSocket) => {
    if(socket.room){
        socket.join(socket?.room)
    }   
}