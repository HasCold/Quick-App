import prisma from "../config/db.config.js";
import { ChatGroupUserType } from "../types/index.js";
import { apiRespHandler, asyncErrorHandler } from "../utils/errorHandler.js";
import { Request, Response } from "express";

class ChatGroupUserController {
    static index = asyncErrorHandler(async (req: Request, res: Response) => {
        try {
            if(req.method != "GET") return apiRespHandler(res, 405, false, "Only GET method is allowed");

            const {group_id} = req.query;
            if(!group_id) return apiRespHandler(res, 404, false, "ID not found!");

            const users = await prisma.groupUsers.findMany({
                where: {
                    group_id: group_id as string
                }
            });

            return apiRespHandler(res, 200, true, "Chats Fetch Successfully", users);

        } catch (error: any) {
            console.error(error);
            return apiRespHandler(res, 500, false, "Something went wrong. Please try again !")
        }
    });

    static store = asyncErrorHandler(async (req: Request, res: Response) => {
        try {
            if(req.method != "POST") return apiRespHandler(res, 405, false, "Only POST method is allowed");
        
            const body: ChatGroupUserType = req.body;
            if(!body) return apiRespHandler(res, 400, false, "Please provide essential parameter in body");

            const users = await prisma.groupUsers.create({
                data: body
            });

            return apiRespHandler(res, 200, true, "User added successfully", users);

        } catch (error) {
            console.error(error);
            return apiRespHandler(res, 500, false, "Something went wrong. Please try again");
        }
    });

    static deleteStoreUser = asyncErrorHandler(async (req: Request, res: Response) => {
        try {
            if(req.method != "DELETE") return apiRespHandler(res, 405, false, "Only DELETE method is allowed");
        
            const {id} = req.query;
            if(!id) return apiRespHandler(res, 400, false, "ID not found");

            await prisma.groupUsers.delete({
                where: {
                    id: Number(id)
                }
            })

            return apiRespHandler(res, 200, true, "User Deleted successfully");

        } catch (error) {
            console.error(error);
            return apiRespHandler(res, 500, false, "Something went wrong. Please try again");
        }
    });
}

export default ChatGroupUserController;