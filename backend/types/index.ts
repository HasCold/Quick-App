import { Socket } from "socket.io";

export interface LoginPayLoadType {
    name: string;
    email: string;
    provider: string;
    oauth_id: string;
    image?: string;
}

export type JWTPayloadType = Omit<
    LoginPayLoadType, 
    "provider" | "oauth_id" | "image"
> & {
    id: number;
}

export type apiLoginType = JWTPayloadType & {
    token: string;
}


export interface CustomSocket extends Socket {
    room?: string | undefined;
}

export type ChatGroupUserType = {
    name: string;
    group_id: string;
}

export type MessageType = {
    id: string;
    group_id: string;
    name: string;
    message: string;
    created_at: string;
}