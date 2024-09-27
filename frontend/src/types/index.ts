export type ChatGroupType = {
    id: string;
    user_id: string;
    title: string;
    passcode: string;
    created_at: string;
}

export type ChatGroupUserType = {
    id: number;
    name: string;
    group_id: string;
    created_at: string;
}