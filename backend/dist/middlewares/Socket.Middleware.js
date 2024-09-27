export const socketMiddleware = (io) => {
    io.use(async (socket, next) => {
        try {
            console.log("HandShake Instance :- ", socket.handshake);
            // This object contains some details about the handshake that happens at the beginning of the Socket.IO session.
            const room = socket.handshake.auth.room || socket.handshake.headers.room;
            if (!room) {
                return next(new Error("Please provide room id"));
            }
            socket.room = room;
            next();
        }
        catch (error) {
            next(new Error("Unknown User"));
        }
    });
};
