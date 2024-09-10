import { Router } from "express";
import AuthController from "../controllers/Auth.Controllers.js";

const route = Router()

route.post("/auth/login", AuthController.login)

export default route;