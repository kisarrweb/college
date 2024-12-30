import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { articles } from "@/db/schema"
import {ChapitresArray} from '@/constants/ChapitresArray'


export const insertArticleSchema = createInsertSchema(articles, {
    titre: (schema) => schema.titre.min(1, "Le Titre est requis"),
    contenu: (schema) => schema.contenu.optional(),
    articleId: (schema) => schema.articleId.optional(),
})

export const selectArticleSchema = createSelectSchema(articles)

export type insertArticleSchemaType = typeof insertArticleSchema._type

export type selectArticleSchemaType = typeof selectArticleSchema._type 

export type dataSelectType = typeof ChapitresArray