import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    // Logs all queries run by Prisma and also log the errors.
    log: ["error", "query"]
})

export default prisma;