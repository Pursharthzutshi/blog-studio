"use server"

import { DeleteBlogFromDb, InsertBlogToDB, UpdateBlogFromDb } from "../lib/dal/blog"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"


export async function GetUserToken() {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    let emailId = ""
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
            emailId = decoded.emailId

            return emailId;
        } catch (error) {
            return error
        }
    }
}

export async function InsertBlog(prevState: any, formData: FormData) {

    const title = formData.get("blog-title") as string
    const desc = formData.get("blog-description") as string
    const emailId = await GetUserToken() as string

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