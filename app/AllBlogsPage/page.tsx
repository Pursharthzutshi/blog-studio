import GetUserToken from "../getUserToken";
import { FetchBlogFromDB } from "../lib/dal/blog"
import BlogList from "./BlogList"

export default async function HomePage() {
    const blogs = await FetchBlogFromDB();


    const GetUserTokenResult = await GetUserToken();

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4">
                <h1 className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                    Community Blogs
                </h1>
                <p className="max-w-xl mx-auto">Explore the latest thoughts, AI-generated insights, and stories from our community.</p>
            </div>

            {/* Pass server-side data to the client-side list component */}
            <BlogList blogs={JSON.parse(JSON.stringify(blogs))} />

            {
                GetUserTokenResult ? <p>Welcome Back, Blogger</p> : <p>Community Blogs</p>
            }

            {blogs.length === 0 && (
                <div className="text-center p-24 glass-card">
                    <p>No blogs found. Start by creating one!</p>
                </div>
            )}
        </div>
    )
}