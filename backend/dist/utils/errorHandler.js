export const apiRespHandler = (res, statusCode = 500, success = false, message = "Internal Server Error", data = null) => {
    const responseObj = {
        success,
        message
    };
    if (data != null && data != undefined) {
        responseObj.data = data;
    }
    return res.status(statusCode).json({ responseObj });
};
export const asyncErrorHandler = (passedFunc) => (req, res, next) => {
    return Promise.resolve(passedFunc(req, res, next)).catch(err => {
        return apiRespHandler(res, 501, false, err.message);
    });
};
