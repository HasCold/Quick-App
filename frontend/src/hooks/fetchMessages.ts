import { FETCH_MESSAGES_URL } from "@/lib/apiEndPoints";

const fetchMessages = async (group_id: string, lastMessageId: string) => {
    try {
        const res = await fetch(`${FETCH_MESSAGES_URL}/${group_id}?lastMessageId=${lastMessageId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(!res.ok){
            throw new Error("Failed to fetch the chat messages !");
        }

        const data = await res.json();
        return data.responseObj.data;

    } catch (error: any) {
        console.error(error.message);
    }
}

export default fetchMessages;