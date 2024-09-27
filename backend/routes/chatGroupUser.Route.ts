import { Router } from "express";
import ChatGroupUserController from "../controllers/ChatGroupUser.Controller.js";

const route = Router();

route.get("/group-chat-fetch", ChatGroupUserController.index);
route.post("/add-user-to-group", ChatGroupUserController.store);

route.delete("/delete-user", ChatGroupUserController.deleteStoreUser);

export default route;