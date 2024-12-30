import ArticleSearch from "@/app/(rs)/articles/ArticleSearch"
import { getArticleSearchResults } from "@/lib/queries/getArticleSearchResults"
import ArticleTable from "./ArticleTable"
// import CustomerTable from "@/app/(rs)/customers/CustomerTable"

export const metadata = {
    title: "Customer Search",
}

export default async function Articles({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { searchText } = await searchParams

    if (!searchText) return <ArticleSearch />

    const results = await getArticleSearchResults(searchText)

    return (
        <>
            <ArticleSearch />
            {results.length ? <ArticleTable data={results} /> : (
                <p className="mt-4">No results found</p>
            )}
        </>
    )
}