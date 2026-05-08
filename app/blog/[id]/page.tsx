import { FetchBlogFromDBById } from "../../lib/dal/blog"
import { notFound } from "next/navigation"
import BlogDetailClient from "./BlogDetailClient"

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const blog = await FetchBlogFromDBById(id)

    if (!blog) {
        notFound()
    }
    const blogData = {
        id: blog._id.toString(),
        title: blog.title as string,
        description: blog.description as string,
        emailId: blog.emailId as string,
    }

    return <BlogDetailClient blog={blogData} />
}
