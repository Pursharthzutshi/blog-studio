"use server"

import { RagBlogQuestionAction } from "../mcp"

export async function AskBlogQuestion(prevState: any, formData: FormData) {
    return await RagBlogQuestionAction(prevState, formData)
}
