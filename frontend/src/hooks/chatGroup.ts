import { CHAT_GROUP_URL } from "@/lib/apiEndPoints";

const fetchChatGroup = async (id: string) => {
  try {
    const res = await fetch(`${CHAT_GROUP_URL}/${id}`, {
        method: "GET",
        cache: "no-cache"
    });

    if(!res.ok){
        throw new Error("Failed to fetch the chat group")
    }

    const data = await res.json();
    if(data.responseObj.success){
        return data.responseObj.data
    }
    return null;

  } catch (error) {
    console.error(error);
    return error
  }
}

export default fetchChatGroup;