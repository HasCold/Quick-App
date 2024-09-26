export const joinRooms = (socket) => {
    if (socket.room) {
        socket.join(socket?.room);
    }
};
