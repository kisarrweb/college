import Form from "next/form"
import { Input } from "@/components/ui/input"
import SearchButton from "@/components/SearchButton"

export default function ArticleSearch() {
    return (
        <Form
            action="/articles"
            className="flex gap-2 items-center"
        >
            <Input
                name="searchText"
                type="text"
                placeholder="Search Articles"
                className="w-full"
                autoFocus
            />
            <SearchButton />
        </Form>
    )
}