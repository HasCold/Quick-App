import { Router } from "express";
import { authMiddleware } from "../middlewares/Auth.Middleware.js";
import ChatGroupController from "../controllers/ChatGroup.Controller.js";

const route = Router();

route.post("/chat-group", authMiddleware, ChatGroupController.store)
route.get("/chat-group/:id", authMiddleware, ChatGroupController.getUniqueRecord)
route.get("/all-chat-groups", authMiddleware, ChatGroupController.getAllRecords)

export default route;