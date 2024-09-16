var _a;
import { apiRespHandler, asyncErrorHandler } from "../utils/errorHandler.js";
import prisma from "../config/db.config.js";
class ChatGroupController {
}
_a = ChatGroupController;
// The constructor is a special function in object-oriented programming, but it does not run at the time of compilation. Instead, the constructor runs when an instance of a class is created (i.e., during object instantiation).
ChatGroupController.getAllRecords = asyncErrorHandler(async (req, res) => {
    try {
        const user = req.user;
        if (req.method != "GET")
            return apiRespHandler(res, 405, false, "Only GET method is allowed");
        if (!user || !user.id)
            return apiRespHandler(res, 401, false, "User not authenticated");
        const groups = await prisma.chatGroup.findMany({
            where: {
                user_id: user.id
            },
            orderBy: {
                created_at: "desc"
            }
        });
        return apiRespHandler(res, 200, true, "Chat groups fetched successfully", groups);
    }
    catch (error) {
        console.error(error);
        return apiRespHandler(res, 500, false, "Something went wrong. Please try again.");
    }
});
ChatGroupController.getUniqueRecord = asyncErrorHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (req.method != "GET")
            return apiRespHandler(res, 405, false, "Only GET method is allowed");
        if (!id)
            return apiRespHandler(res, 404, false, "Id not found");
        const uniqueChat = await prisma.chatGroup.findUnique({
            where: {
                id: id
            }
        });
        return apiRespHandler(res, 200, true, "Chats fetched successfully !", uniqueChat);
    }
    catch (error) {
        console.error(error);
        return apiRespHandler(res, 500, false, "Something went wrong. Please try again.");
    }
});
ChatGroupController.updateChat = asyncErrorHandler(async (req, res) => {
    try {
        const body = req.body;
        const { id } = req.params;
        if (req.method != "PUT")
            return apiRespHandler(res, 405, false, "Only PUT method is allowed");
        if (!id || !body)
            return apiRespHandler(res, 404, false, "Something is missing");
        await prisma.chatGroup.update({
            where: {
                id: id
            },
            data: {
                title: body.title,
                passcode: body.passcode
            }
        });
        return apiRespHandler(res, 200, true, "Chat Group Updated Successfully");
    }
    catch (error) {
        console.error(error);
        return apiRespHandler(res, 500, false, "Something went wrong. Please try again.");
    }
});
ChatGroupController.destroy = asyncErrorHandler(async (req, res) => {
    try {
        const { id } = req.query;
        if (req.method != "DELETE")
            return apiRespHandler(res, 405, false, "Only DELETE method is allowed");
        if (!id)
            return apiRespHandler(res, 404, false, "Something is missing");
        await prisma.chatGroup.delete({
            where: {
                id: id
            }
        });
        return apiRespHandler(res, 200, true, "Deleted Successfully");
    }
    catch (error) {
        console.error(error);
        return apiRespHandler(res, 500, false, "Something went wrong. Please try again.");
    }
});
ChatGroupController.store = asyncErrorHandler(async (req, res) => {
    try {
        const body = req.body;
        const user = req.user;
        if (req.method != "POST")
            return apiRespHandler(res, 405, false, "Only POST method is allowed");
        if (!user || !user.id)
            return apiRespHandler(res, 401, false, "User not authenticated");
        if (!body.title || !body.passcode)
            return apiRespHandler(res, 404, false, "Something not found");
        await prisma.chatGroup.create({
            data: {
                title: body.title,
                passcode: body.passcode,
                user_id: user?.id
            }
        });
        return apiRespHandler(res, 200, true, "Chat group created successfully");
    }
    catch (error) {
        console.error(error);
        return apiRespHandler(res, 500, false, "Something went wrong. Please try again.");
    }
});
export default ChatGroupController;
