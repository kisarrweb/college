import { db } from "@/db";
import { articles } from "@/db/schema";
import { ilike, or, sql } from "drizzle-orm"

export async function getArticleSearchResults(searchText: string) {
    const results = await db.select()
        .from(articles)
        .where(or(
            ilike(articles.titre, `%${searchText}%`),
            ilike(articles.contenu, `%${searchText}%`),
            sql`lower(concat(${articles.titre}, ' ', ${articles.contenu})) LIKE ${`%${searchText.toLowerCase().replace(' ', '%')}%`}`,
        ))
        .orderBy(articles.id)
    return results
}