"use server"

import GetUserToken from "../getUserToken"
import { DeleteBlogFromDb, InsertBlogQuestionsAndAnswersToDB, InsertBlogToDB, UpdateBlogFromDb } from "../lib/dal/blog"
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

// export async function fetchBlogQuestionsAndAnswers(formData: FormData) {
//     const userResult = await GetUserToken()

//     const emailId = userResult?.emailId

//     const fetchBlogQuestionsAndAnswersResult = await 
// }



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
