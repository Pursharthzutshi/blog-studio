"use client"

import { useActionState } from "react"
import { AnalyzeBlogAction } from "../(actions)/analyze"
import { DeleteBlogAction } from "../(actions)/blog"

export default function BlogList({ blogs }: { blogs: any[] }) {
    const initialState = { state: "", message: "", data: null }
    const [state, formAction, isPending] = useActionState(AnalyzeBlogAction, initialState)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
                <div key={blog._id.toString()} className="glass-card flex flex-col h-full group hover-lift">
                    <div className="p-8 flex-1 space-y-5">
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-purple-500/60">
                                #{blog._id.toString().slice(-4)}
                            </span>
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                        </div>

                        <h3 className="line-clamp-2 text-white group-hover:text-purple-300 transition-colors duration-300">
                            {blog.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-4 leading-relaxed whitespace-pre-wrap opacity-80 group-hover:opacity-100 transition-opacity">
                            {blog.description}
                        </p>
                    </div>
                    
                    <div className="px-8 pb-8 flex items-center justify-between gap-4">
                        <form action={formAction} className="flex-1">
                            <input type="hidden" name="blog-id" value={blog._id.toString()} />
                            <button 
                                type="submit" 
                                disabled={isPending}
                                className="w-full py-2.5 text-[10px] uppercase tracking-widest font-black bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                            >
                                {isPending ? "Analyzing..." : "Intelligence"}
                            </button>
                        </form>

                        <form action={DeleteBlogAction}>
                            <input type="hidden" name="blog-id" value={blog._id.toString()} />
                            <button 
                                type="submit" 
                                className="px-4 py-2.5 text-[10px] uppercase tracking-widest font-black bg-red-500/5 text-red-500/60 hover:bg-red-500/10 hover:text-red-500 border-transparent transition-all"
                                title="Delete Blog"
                            >
                                ✕
                            </button>
                        </form>
                    </div>
                </div>
            ))}

            {/* Global response overlay */}
            {state?.message && !isPending && (
                <div className="fixed bottom-12 right-12 max-w-md glass-card p-8 border-purple-500/40 shadow-[0_20px_50px_rgba(99,102,241,0.2)] animate-in slide-in-from-right-12 z-[100] backdrop-blur-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center text-white text-xs font-black shadow-lg">AI</div>
                            <h3 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em]">Intelligence Report</h3>
                        </div>
                        <button onClick={() => window.location.reload()} className="text-gray-500 hover:text-white transition-colors">✕</button>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm leading-relaxed text-gray-200 bg-white/5 p-4 rounded-xl border border-white/5">
                            {state.message}
                        </p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="w-full py-3 text-[10px] uppercase tracking-widest font-black bg-white/5 hover:bg-white/10 transition-all"
                        >
                            Dismiss Report
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
