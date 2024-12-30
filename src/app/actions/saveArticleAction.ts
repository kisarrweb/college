"use server"

import { eq } from 'drizzle-orm'
import { flattenValidationErrors } from 'next-safe-action'
import { redirect } from 'next/navigation'

import { db } from '@/db'
import { articles } from '@/db/schema'
import { actionClient } from '@/lib/safe-action'
import { insertArticleSchema, type insertArticleSchemaType } from '@/zod-schemas/article'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const saveArticleAction = actionClient
    .metadata({ actionName: 'saveArticleAction' })
    .schema(insertArticleSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({
        parsedInput: article
    }: { parsedInput: insertArticleSchemaType }) => {

        const { isAuthenticated } = getKindeServerSession()

        const isAuth = await isAuthenticated()

        if (!isAuth) redirect('/login')

        // New Article 
        // All new articles are active by default - no need to set active to true
        // createdAt and updatedAt are set by the database
        if (article.id === 0) {
            const result = await db.insert(articles).values({
                titre: article.titre,
                contenu: article.contenu,
                articleId: article.articleId
                
            }).returning({ insertedId: articles.id })

            return { message: `Customer ID #${result[0].insertedId} created successfully` }
        }

        // Existing customer 
        // updatedAt is set by the database
        const result = await db.update(articles)
            .set({
                titre: article.titre,
                contenu: article.contenu,
                articleId: article.articleId,
            })
            .where(eq(articles.id, article.id!))
            .returning({ updatedId: articles.id })

        return { message: `Customer ID #${result[0].updatedId} updated successfully` }
    })