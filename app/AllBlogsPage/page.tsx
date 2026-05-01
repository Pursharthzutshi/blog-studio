import GetUserToken from "../getUserToken";
import { FetchBlogFromDB } from "../lib/dal/blog"
import BlogList from "./BlogList"

export default async function HomePage() {
    const blogs = await FetchBlogFromDB();
    const GetUserTokenResult = await GetUserToken();

    return (
        <div className="py-8 space-y-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="space-y-3">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        All Blogs
                    </h1>
                    <p className="text-[var(--text-muted)] text-sm">
                        Explore the latest posts from our community of creators.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="badge">
                        {blogs.length} {blogs.length === 1 ? 'post' : 'posts'}
                    </span>
                    {GetUserTokenResult && (
                        <span className="badge badge-accent">
                            ✦ Logged In
                        </span>
                    )}
                </div>
            </div>

            {/* Blog Grid */}
            <BlogList blogs={JSON.parse(JSON.stringify(blogs))} />

            {/* Empty state */}
            {blogs.length === 0 && (
                <div className="text-center py-24 card border-dashed">
                    <div className="text-4xl mb-4">📝</div>
                    <p className="text-[var(--text-muted)] font-medium">No blogs yet. Start by creating one!</p>
                </div>
            )}
        </div>
    )
}