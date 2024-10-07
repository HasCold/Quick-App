import express from "express";
import cors from "cors";
import http from "http";
import colors from "colors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.Route.js";
import chatGroupRoute from "./routes/chatGroups.Route.js";
import { Server } from "socket.io";
import { setUpSocket } from "./libs/socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import ioRedis from "./config/redis.config.js";
import { instrument } from "@socket.io/admin-ui";
import individualGroupChatRoute from "./routes/chatGroupUser.Route.js";
import fetchChatsRoute from "./routes/fetchChats.Route.js";
import { connectKafkaProducer } from "./config/kafka.config.js";
import { consumeMessages } from "./libs/helper.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // to accept the frontend datat
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_APP_URL, "https://admin.socket.io"],
        credentials: true,
    },
    adapter: createAdapter(ioRedis)
});
instrument(io, {
    auth: false,
    mode: "development",
});
setUpSocket(io);
app.use("/api", authRoute);
app.use("/api", chatGroupRoute);
app.use("/api", individualGroupChatRoute);
app.use("/api", fetchChatsRoute);
app.get("/", (req, res) => {
    res.send("Server is running successfully");
});
connectKafkaProducer().catch(err => {
    console.log("Something went wrong", colors.bgRed.white(err.message));
});
consumeMessages(process.env.KAFKA_TOPIC).catch(err => {
    console.log("The consumer error is", colors.bgRed.italic(err.message));
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(colors.bgYellow.bold(`Server is running on PORT : ${PORT}`));
});
export { io };
