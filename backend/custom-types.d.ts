interface AuthUser {
    id: number;
    email: string;
    name: string;
}

declare namespace Express{
    interface Request{
        user?: AuthUser;
    }
}