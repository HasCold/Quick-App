export const apiRespHandler = (res, statusCode = 500, success = false, message = "Internal Server Error", data = null) => {
    return res.status(statusCode).json({
        success,
        message,
        data
    });
};
