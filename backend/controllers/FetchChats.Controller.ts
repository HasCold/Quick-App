import prisma from "../config/db.config.js";
import { apiRespHandler, asyncErrorHandler } from "../utils/errorHandler.js";
import { Request, Response } from "express";

class FetchChatsController{

    static fetchChats = asyncErrorHandler(async (req: Request, res: Response) => {
        try {
            const {group_id} = req.params;

            if(req.method != "GET") return apiRespHandler(res, 405, false, "Only GET method is allowed");
            if(!group_id) return apiRespHandler(res, 404, false, "ID not found");

            const fetchResult = await prisma.chats.findMany({
                skip: 40,  // skip method
                take: 10,  // limit method
                where: {
                  group_id: group_id
                },
                orderBy: {   // sort method
                    created_at: "desc"
                }
            })
            
        } catch (error: any) {
            console.error(error);
            return apiRespHandler(res, 500, false, "Something went wrong. Please try again");
        }
    })

}

export default FetchChatsController;
