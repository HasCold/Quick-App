var _a;
import prisma from "../config/db.config.js";
import { apiRespHandler, asyncErrorHandler } from "../utils/errorHandler.js";
import { validate as validateUUID } from "uuid";
class FetchChatsController {
}
_a = FetchChatsController;
FetchChatsController.fetchAllChats = asyncErrorHandler(async (req, res) => {
    try {
        const { group_id } = req.params;
        if (req.method != "GET")
            return apiRespHandler(res, 405, false, "Only GET method is allowed");
        if (!group_id)
            return apiRespHandler(res, 404, false, "ID not found");
        const fetchAllChats = await prisma.chats.findMany({
            where: {
                group_id: group_id
            },
            orderBy: {
                created_at: "desc"
            }
        });
        return apiRespHandler(res, 200, true, "Messages fetched successfully", fetchAllChats);
    }
    catch (error) {
        console.error(error);
        return apiRespHandler(res, 500, false, "Something went wrong. Please try again");
    }
});
FetchChatsController.paginatedFetchChats = asyncErrorHandler(async (req, res) => {
    try {
        const { group_id } = req.params;
        const { lastMessageId } = req.query;
        if (req.method != "GET")
            return apiRespHandler(res, 405, false, "Only GET method is allowed");
        if (!group_id)
            return apiRespHandler(res, 404, false, "ID not found");
        // The validateUUID function checks if the lastMessageId is a valid UUID.
        const fetchResult = await prisma.chats.findMany({
            take: 10, // Limit the number of results
            skip: lastMessageId && validateUUID(lastMessageId) ? 1 : 0, // Skip the last fetched message to avoid duplicates
            cursor: lastMessageId && validateUUID(lastMessageId) ? { id: lastMessageId } : undefined, // Start after the last fetched message
            where: {
                group_id: group_id
            },
            orderBy: {
                created_at: "asc"
            }
        });
        return apiRespHandler(res, 200, true, "Messages fetched successfully", fetchResult);
    }
    catch (error) {
        console.error(error);
        return apiRespHandler(res, 500, false, "Something went wrong. Please try again");
    }
});
export default FetchChatsController;
// How Your Code Works:
// take: 10: Limits the number of messages fetched to 10.
// skip: lastMessageId ? 1 : 0: Skips the last message if lastMessageId is provided. This avoids fetching the same message again.
// cursor: lastMessageId ? { id: lastMessageId } : undefined: Sets the point after which the next fetch should start. If lastMessageId is provided, the next fetch will start after the message with that id.
// orderBy: { created_at: "desc" }: Ensures the messages are fetched in descending order based on their created_at timestamp (newest first).
