import { ALL_CHAT_GROUP_URL } from "@/lib/apiEndPoints";

const fetchChatGroups = async (token: string) => {
  try {
    const res = await fetch(ALL_CHAT_GROUP_URL, {
        method: "GET",
        headers: {
            Authorization: token,
            "Content-Type": "application/json"
        },
        next: {
            revalidate: 60 * 60,  //  revalidate the data every one hour (60 seconds * 60 minutes = 3600 seconds).
            tags: ["dashboard"]
        }
    });

    if(!res.ok){
        throw new Error("Failed to fetch data");
    }

    const response = await res.json();
    if(response.responseObj.success){
        return response.responseObj?.data
    }

    return [];

  } catch (error) {
    console.error(error);
    return error
  }
}

export default fetchChatGroups;