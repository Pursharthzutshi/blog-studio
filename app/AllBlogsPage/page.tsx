import GetUserToken from "../getUserToken";
import { FetchBlogFromDB } from "../lib/dal/blog"
import BlogList from "./BlogList"

export default async function HomePage() {
    const blogs = await FetchBlogFromDB();
    const GetUserTokenResult = await GetUserToken();

    return (
        <div style={{ paddingTop: '64px', paddingBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px', width: '100%' }}>
            {/* Header */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        All Blogs
                    </h1>
                    <p className="text-[var(--text-muted)] text-sm">
                        Explore the latest posts from our community of creators.
                    </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
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
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <BlogList blogs={JSON.parse(JSON.stringify(blogs))} />
            </div>

            {/* Empty state */}
            {blogs.length === 0 && (
                <div className="py-24 px-8 card border-dashed" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div className="text-4xl mb-4">📝</div>
                    <p className="text-[var(--text-muted)] font-medium">No blogs yet. Start by creating one!</p>
                </div>
            )}
        </div>
    )
}