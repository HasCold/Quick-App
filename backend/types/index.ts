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