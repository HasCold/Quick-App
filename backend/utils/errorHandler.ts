import { NextFunction, Response, Request, RequestHandler } from "express"

type ResponseObjType = {
    success: boolean,
    message: string,
    data?: any
}

export const apiRespHandler = (res: Response, statusCode= 500, success = false, message = "Internal Server Error", data: any = null) => {
    
    const responseObj: ResponseObjType = {
        success,
        message
    }

    if(data != null && data != undefined){
        responseObj.data = data;
    }

    return res.status(statusCode).json({responseObj})
}

export const asyncErrorHandler = (passedFunc: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(passedFunc(req, res, next)).catch(err => {
        return apiRespHandler(res, 501, false, err.message)
    });
}