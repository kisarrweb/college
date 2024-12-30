import { db } from "@/db"
import { articles } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getArticle(id: number) {
    const article = await db.select()
        .from(articles)
        .where(eq(articles.id, id))

    return article[0]
}