import Env from "./env";

export const BASE_URL = Env.BACKEND_URL
export const API_URL = BASE_URL + "/api"

export const LOGIN_URL = API_URL + "/auth/login"
export const CHAT_GROUP_URL = API_URL + "/chat-group"
export const ALL_CHAT_GROUP_URL = API_URL + "/all-chat-groups"
export const EDIT_CHAT_GROUP_URL = API_URL + "/update-chat"
export const DELETE_CHAT_URL = API_URL + "/delete-chat"

export const CHAT_GROUP_USER_URL = API_URL + "/group-chat-fetch";
export const ADD_USER_TO_GROUP = API_URL + "/add-user-to-group"