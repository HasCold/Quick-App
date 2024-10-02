import { Router } from "express";
import FetchChatsController from "../controllers/FetchChats.Controller.js";

const route = Router();

route.get("/fetch-chats/:group_id", FetchChatsController.paginatedFetchChats);
route.get("/fetch-all-chats/:group_id", FetchChatsController.fetchAllChats);


export default route;