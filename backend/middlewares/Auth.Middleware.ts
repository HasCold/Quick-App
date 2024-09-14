import { apiRespHandler } from "../utils/errorHandler.js"
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if(authHeader && authHeader?.startsWith("Bearer")){

            const token = authHeader?.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
                if (err) return apiRespHandler(res, 401, false, "Unauthorized")
                req.user = user as AuthUser
                
                next();
            })

        }else{
            return apiRespHandler(res, 404, false, "Token Not Found")
        }

    } catch (error: any) {
      console.error(error.message);
      return apiRespHandler(res, 500, false)  
    }
}

