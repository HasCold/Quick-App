import { CHAT_GROUP_USER_URL } from "@/lib/apiEndPoints";


const fetchUsers = async (group_id: string) => {
    try {
        const res = await fetch(`${CHAT_GROUP_USER_URL}?group_id=${group_id}`, {
            method: "GET",
            next: {
                tags: ["users"]
            }
        });

        if(!res.ok){
            throw new Error(res.statusText);
        }
    
        const data = await res.json();
        if(data.responseObj.success){
            return data.responseObj.data
        }
        console.log("Fetch User Hook Data ;-", data)
        
        return []

    } catch (error: any) {
        console.error(error.message);
        return error;
    }
}

export default fetchUsers;