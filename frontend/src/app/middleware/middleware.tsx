export {default} from "next-auth/middleware"

// Private some certain routes

export const config = {
    matcher: ["/dashboard"]
}