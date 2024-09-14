import { apiRespHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader?.startsWith("Bearer")) {
            const token = authHeader?.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
                if (err)
                    return apiRespHandler(res, 401, false, "Unauthorized");
                req.user = user;
                next();
            });
        }
        else {
            return apiRespHandler(res, 404, false, "Token Not Found");
        }
    }
    catch (error) {
        console.error(error.message);
        return apiRespHandler(res, 500, false);
    }
};
