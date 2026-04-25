"use server"

import { DeleteBlogFromDb, InsertBlogToDB, UpdateBlogFromDb } from "../lib/dal/blog"
import { revalidatePath } from "next/cache"

export async function InsertBlog(prevState: any, formData: FormData) {
    const title = formData.get("blog-title") as string
    const desc = formData.get("blog-description") as string

    const result = await InsertBlogToDB(title, desc)

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