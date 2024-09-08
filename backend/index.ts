import express from "express"
import cors from "cors"
import http from "http"
import colors from "colors"
import dotenv from "dotenv"

dotenv.config();

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // to accept the frontend datat

const server = http.createServer(app)

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(colors.bgYellow.bold(`Server is running on PORT : ${PORT}`))
});