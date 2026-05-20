"use server"

import GetUserToken from "../getUserToken"
import { DeleteBlogFromDb, FetchRecentQuestionsAndAnswersFromDB, InsertBlogQuestionsAndAnswersToDB, InsertBlogToDB, UpdateBlogFromDb } from "../lib/dal/blog"
import { revalidatePath } from "next/cache"



export async function InsertBlog(prevState: any, formData: FormData) {

    const title = formData.get("blog-title") as string
    const desc = formData.get("blog-description") as string
    const userResult = await GetUserToken()


    const emailId = userResult?.emailId
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
