import { getArticle } from "@/lib/queries/getArticle";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs"
import ArticleForm from "@/app/(rs)/articles/form/ArticleForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { articleId } = await searchParams

    if (!articleId) return { title: "New Article" }

    return { title: `Edit Article #${articleId}` }
}

export default async function ArticleFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    try {
        const { getPermission } = getKindeServerSession()
        const managerPermission = await getPermission("manager")

        const { myArticleId } = await searchParams

        // Edit article form 
        if (myArticleId) {
            const article = await getArticle(parseInt(myArticleId))

            if (!article) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">Article ID #{myArticleId} not found</h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                )
            }
            // put customer form component 
            return <ArticleForm key={myArticleId} article={article} />
        } else {
            // new customer form component 
            return <ArticleForm key="new" />
        }

    } catch (e) {
        if (e instanceof Error) {
            Sentry.captureException(e)
            throw e
        }
    }
}