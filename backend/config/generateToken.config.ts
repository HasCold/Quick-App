import jwt from "jsonwebtoken"
import { JWTPayloadType } from "../types/index.js";


export const generateToken = (id: JWTPayloadType) => {
    // Used non-null assertion (!) for process.env.JWT_SECRET_KEY: This ensures that TypeScript knows JWT_SECRET_KEY won't be null or undefined.
    return jwt.sign(id, process.env.JWT_SECRET_KEY!, {   
        expiresIn: "365d"
    })
}