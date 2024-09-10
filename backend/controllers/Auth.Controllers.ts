import { Request, Response } from "express";
import { JWTPayloadType, LoginPayLoadType } from "../types/index.js";
import prisma from "../config/db.config.js";
import { generateToken } from "../config/generateToken.config.js";
import { apiRespHandler } from "../utils/errorHandler.js";

// In JavaScript, static methods are part of the class itself rather than instances of the class. This means that you can call the method directly on the class without having to create an instance of it.

class AuthController {
    static async login(req: Request, res: Response){
        try {
            const userData: LoginPayLoadType = req.body;
            let findUser = await prisma.user.findUnique({
                where: {
                    email: userData.email
                }
            })

            if(!findUser){
                findUser = await prisma.user.create({
                    data: userData
                });
            }

            let JWTPayload: JWTPayloadType = {
                name: userData.name,
                email: userData.email,
                id: findUser.id
            }

            const token = generateToken(JWTPayload)
            return apiRespHandler(res, 200, true, "Logged in successfully", 
                {
                    ...findUser, 
                    token: `Bearer ${token}`
                }
            )

        } catch (error: any) {
            console.error(error);
            return apiRespHandler(res, 500, false)
        }
    }
}

export default AuthController;