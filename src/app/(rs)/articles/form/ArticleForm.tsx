"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { asc, desc } from 'drizzle-orm';
import { InputWithLabel } from "@/components/inputs/InputWithLabel"
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel"

import { ChapitresArray } from "@/constants/ChapitresArray"

import { insertArticleSchema, type insertArticleSchemaType, type selectArticleSchemaType } from "@/zod-schemas/article"

import { useAction } from 'next-safe-action/hooks'
import { useToast } from '@/hooks/use-toast'
import { LoaderCircle } from 'lucide-react'
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { saveArticleAction } from "@/app/actions/saveArticleAction"
import { db } from "@/db"
import { articles as Art } from "@/db/schema"


type Props = {
    article?: selectArticleSchemaType,
}

export default async function ArticleForm({ article }: Props) {

    const { toast } = useToast()
    
    const searchParams = useSearchParams()
    const hasArticleId = searchParams.has("myArticleId")

    const emptyValues: insertArticleSchemaType = {
        id: 0,
        titre: '',
        contenu: '',
        articleId: null
    }

    const defaultValues: insertArticleSchemaType = hasArticleId ? {
        id: article?.id ?? 0,
        titre: article?.titre ?? '',
        contenu: article?.contenu ?? '',
        articleId: article?.articleId ?? null,
    } : emptyValues

    const form = useForm<insertArticleSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertArticleSchema),
        defaultValues,
    })

    useEffect(() => {
        form.reset(hasArticleId ? defaultValues : emptyValues)
    }, [searchParams.get("articleId")]) // eslint-disable-line react-hooks/exhaustive-deps

    const {
        execute: executeSave,
        result: saveResult,
        isPending: isSaving,
        reset: resetSaveAction,
    } = useAction(saveArticleAction, {
        onSuccess({ data }) {
            if (data?.message) {
                toast({
                    variant: "default",
                    title: "Success! 🎉",
                    description: data.message,
                })
            }
        },
        onError({ error }) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Save Failed",
            })
        }
    })

    async function submitForm(data: insertArticleSchemaType) {
        executeSave(data)
    }

    return (
        <div className="flex flex-col gap-1 sm:px-8">
            <DisplayServerActionResponse result={saveResult} />
            <div>
                <h2 className="text-2xl font-bold">
                    {article?.id ? "Edit" : "New"} Article {article?.id ? `#${article.id}` : "Form"}
                </h2>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitForm)}
                    className="flex flex-col md:flex-row gap-4 md:gap-8"
                >
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <SelectWithLabel<insertArticleSchemaType>
                            fieldTitle="Parent"
                            nameInSchema="articleId"
                            data={ChapitresArray}
                        />
                        <InputWithLabel<insertArticleSchemaType>
                            fieldTitle="Titre"
                            nameInSchema="titre"
                        />

                        <InputWithLabel<insertArticleSchemaType>
                            fieldTitle="Contenu"
                            nameInSchema="contenu"
                        />                        

                    </div>

                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                className="w-3/4"
                                variant="default"
                                title="Save"
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <>
                                        <LoaderCircle className="animate-spin" /> Saving
                                    </>
                                ) : "Save"}
                            </Button>

                            <Button
                                type="button"
                                variant="destructive"
                                title="Reset"
                                onClick={() => {
                                    form.reset(defaultValues)
                                    resetSaveAction()
                                }}
                            >
                                Reset
                            </Button>
                        </div>

                    

                </form>
            </Form>

        </div>
    )
}
