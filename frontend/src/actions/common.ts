"use server";

import { revalidateTag } from "next/cache";

// For most use cases, prefer revalidating entire paths. If you need more granular control, you can use the revalidateTag function.

export async function clearCache(tag: string){
    // Invalidate all data tagged with 'posts' in the cache
    revalidateTag(tag)
}   