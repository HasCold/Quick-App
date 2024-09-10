import { Response } from "express"

export const apiRespHandler = (res: Response, statusCode= 500, success = false, message = "Internal Server Error", data: any = null) => {
    return res.status(statusCode).json({
        success,
        message,
        data
    })
}