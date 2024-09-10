import prisma from "../config/db.config.js";
import { generateToken } from "../config/generateToken.config.js";
import { apiRespHandler } from "../utils/errorHandler.js";
class AuthController {
    static async login(req, res) {
        try {
            const userData = req.body;
            let findUser = await prisma.user.findUnique({
                where: {
                    email: userData.email
                }
            });
            if (!findUser) {
                findUser = await prisma.user.create({
                    data: userData
                });
            }
            let JWTPayload = {
                name: userData.name,
                email: userData.email,
                id: findUser.id
            };
            const token = generateToken(JWTPayload);
            return apiRespHandler(res, 200, true, "Logged in successfully", {
                ...findUser,
                token: `Bearer ${token}`
            });
        }
        catch (error) {
            console.error(error);
            return apiRespHandler(res, 500, false);
        }
    }
}
export default AuthController;
