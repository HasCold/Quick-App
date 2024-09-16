import { z } from "zod";

export const createChatValidation = z.object({
    title: z.string().min(4, {message: "Chat title must be of 4 characters long."}).max(200, {message: "Chat title must be less than 200 characters"}),
    passcode: z.string().min(4, {message: "Chat passcode must e of 4 characters long."}).max(10, {message: "Passcode must be less than 10 characters"})
}).required()


export type createChatSchemaType = z.infer<typeof createChatValidation>