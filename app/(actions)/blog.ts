"use server"

import GetUserToken from "../getUserToken"
import { DeleteBlogFromDb, FetchRecentQuestionsAndAnswersFromDB, InsertBlogQuestionsAndAnswersToDB, InsertBlogToDB, UpdateBlogFromDb } from "../lib/dal/blog"
import { revalidatePath } from "next/cache"
import openrouter from "../lib/dal/openrouter"



export async function InsertBlog(prevState: any, formData: FormData) {

    const title = formData.get("blog-title") as string
    const desc = formData.get("blog-description") as string
    const userResult = await GetUserToken()
    const emailId = userResult?.emailId

    // ── AI Content Moderation ──────────────────────────────────────────────────
    // Ask the AI to classify the content before saving anything to the DB.
    try {
        const moderationPrompt = `You are a strict content moderator for a public blog platform.

Review the blog title and content below and decide if it is appropriate for a general audience.

Flag as UNSAFE if it contains any of the following: violence, weapons, instructions for harm, hate speech, terrorism, explicit sexual content, drug promotion, self-harm encouragement, or any other content that violates community standards.

Title: "${title}"
Content: "${desc}"

Respond with ONLY one word — either SAFE or UNSAFE. No explanation.`

        const moderationResult = await openrouter([{ role: "user", content: moderationPrompt }])
        const verdict = moderationResult.trim().toUpperCase()

        if (verdict.includes("UNSAFE")) {
            return {
                state: "refused",
                message: "REFUSED: Your blog contains content that violates our community guidelines and cannot be published.",
                data: null
            }
        }
    } catch (err) {
        // If moderation itself fails, fall through and allow publish
        // (avoids blocking legitimate posts due to AI outage)
        console.error("[Moderation] Check failed, allowing post through:", err)
    }
    // ──────────────────────────────────────────────────────────────────────────

    const result = await InsertBlogToDB(title, desc, emailId)

    return {
        state: "success",
        message: "",
        data: JSON.parse(JSON.stringify(result))
    }

}



export async function DeleteBlog(prevState: any, formData: FormData) {

    const id = formData.get("blog-id") as string

    const result = await DeleteBlogFromDb(id)

    return {
        state: "success",
        message: "",
        data: JSON.parse(JSON.stringify(result))
    }


}



export async function DeleteBlogAction(formData: FormData) {
    const id = formData.get("blog-id") as string
    await DeleteBlogFromDb(id)
    revalidatePath("/AllBlogsPage")
}

export async function UpdateBlog(prevState: any, formData: FormData) {
    const id = formData.get("blog-id") as string
    const title = formData.get("blog-title") as string
    const desc = formData.get("blog-description") as string

    const result = await UpdateBlogFromDb(id, { title, description: desc })

    return {
        state: "success",
        message: "",
        data: JSON.parse(JSON.stringify(result))
    }

}

export async function FetchRecentQuestionsAndAnswers() {
    const userResult = await GetUserToken()

    const emailId: string | undefined = userResult?.emailId

    const fetchBlogQuestionsAndAnswersResult = await FetchRecentQuestionsAndAnswersFromDB(emailId!);

    return {
        state: "success",
        message: "",
        data: JSON.parse(JSON.stringify(fetchBlogQuestionsAndAnswersResult))
    }
}



export async function InsertBlogQuestionsAndAnswers(userQuestion: string, aiAnswerResponse: string) {
    const userResult = await GetUserToken()

    const emailId = userResult?.emailId

    const fetchBlogQuestionsAndAnswersResult = await InsertBlogQuestionsAndAnswersToDB(userQuestion, aiAnswerResponse, emailId)

    return {
        state: "success",
        message: "",
        data: JSON.parse(JSON.stringify(fetchBlogQuestionsAndAnswersResult))
    }


}
