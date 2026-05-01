import GetUserToken from "../getUserToken";
import { FetchBlogFromDB } from "../lib/dal/blog"
import BlogList from "./BlogList"

export default async function HomePage() {
    const blogs = await FetchBlogFromDB();
    const GetUserTokenResult = await GetUserToken();

    return (
        <div className="py-12 space-y-16">
            {/* Hero Header */}
            <div className="text-center space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    Live Feed
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent leading-none">
                    Community Blogs
                </h1>

                <p className="max-w-xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed">
                    Explore the latest thoughts, AI-generated insights, and stories from our distributed network of creators.
                </p>

                {GetUserTokenResult && (
                    <span className="inline-block text-[10px] uppercase tracking-[0.3em] font-bold text-purple-400/70 border border-purple-500/20 px-4 py-1.5 rounded-full bg-purple-500/5">
                        ✦ Welcome Back, Blogger
                    </span>
                )}
            </div>

            {/* Blog Grid */}
            <BlogList blogs={JSON.parse(JSON.stringify(blogs))} />

            {/* Empty state */}
            {blogs.length === 0 && (
                <div className="text-center p-24 glass-card border-dashed border-white/10">
                    <div className="text-5xl mb-6">📭</div>
                    <p className="text-gray-400 font-medium text-lg">No blogs yet. Start by creating one!</p>
                </div>
            )}
        </div>
    )
}