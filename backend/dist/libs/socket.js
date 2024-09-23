export function setUpSocket(io) {
    io.on("connection", (socket) => {
        console.log("User connected !", socket.id);
        // io.emit("recieve-message", data);  // This message will send everyone and also including me
        // socket.broadcast.emit("recieve-message", data);  // This message will send everyone but except me
        // OR both will work as same io / socket
        socket.on("sent-message", (data) => {
            console.log("Received message from user:", data);
            // socket.emit("server-msg", {data, str: "Hello, World"})
            socket.broadcast.emit("server-msg", { data, str: "Hello, World" });
        });
        socket.on("error", (err) => {
            console.error(`Error on socket ${socket.id}`, err);
        });
        socket.on("disconnect", () => {
            console.log(`${socket.id} is disconnected ...`);
        });
    });
}
