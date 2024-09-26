import express, { Application } from "express"
import cors from "cors"
import http from "http"
import colors from "colors"
import dotenv from "dotenv"
import { Request, Response } from "express"
import authRoute from "./routes/auth.Route.js"
import chatGroupRoute from "./routes/chatGroups.Route.js"
import { Server } from "socket.io"
import { setUpSocket } from "./libs/socket.js"
import { createAdapter } from "@socket.io/redis-streams-adapter";
import ioRedis from "./config/redis.config.js"
import { instrument } from "@socket.io/admin-ui"

dotenv.config();

const app: Application = express()

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // to accept the frontend datat

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_APP_URL!, "https://admin.socket.io"],
        credentials: true,
    },
    adapter: createAdapter(ioRedis)
});

instrument(io, {
    auth: false,
    mode: "development",
});

setUpSocket(io);

app.use("/api", authRoute)
app.use("/api", chatGroupRoute)

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running successfully")
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(colors.bgYellow.bold(`Server is running on PORT : ${PORT}`))
});

export {io};