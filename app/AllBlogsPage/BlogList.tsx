"use client"

import { useActionState } from "react"
import Link from "next/link"
import { AnalyzeBlogAction } from "../(actions)/analyze"
import { DeleteBlogAction } from "../(actions)/blog"

export default function BlogList({ blogs }: { blogs: any[] }) {
    const initialState = { state: "", message: "", data: null }
    const [state, formAction, isPending] = useActionState(AnalyzeBlogAction, initialState)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {blogs.map((blog) => (
                <div key={blog._id.toString()} className="glass-card flex flex-col group border-white/5 hover:border-purple-500/30 transition-all duration-500" style={{ minHeight: '380px' }}>
                    {/* Top accent bar */}
                    <div className="h-[2px] w-full rounded-t-[1.25rem] bg-gradient-to-r from-purple-600/0 via-purple-500/60 to-indigo-500/0 group-hover:via-purple-400 transition-all duration-500" />

                    {/* Card body */}
                    <div className="p-7 flex-1 flex flex-col gap-4">
                        {/* Card header row */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 min-w-0">
                                <div className="h-2 w-2 shrink-0 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.8)] animate-pulse" />
                                <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-500 truncate">
                                    #{blog._id.toString().slice(-6).toUpperCase()}
                                </span>
                            </div>
                            <span className="text-[9px] text-gray-600 uppercase tracking-widest shrink-0 ml-2">Post</span>
                        </div>

                        {/* Title — clickable */}
                        <Link href={`/blog/${blog._id.toString()}`}>
                            <h3 className="text-lg font-bold text-white leading-snug hover:text-purple-300 transition-colors duration-300 cursor-pointer" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {blog.title || 'Untitled Blog'}
                            </h3>
                        </Link>

                        {/* Separator */}
                        <div className="h-px bg-white/5" />

                        {/* Description */}
                        <p className="text-sm text-gray-400 leading-relaxed flex-1" style={{ display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {blog.description || 'No description available.'}
                        </p>

                        {/* Read More — actual link */}
                        <Link href={`/blog/${blog._id.toString()}`} className="text-[10px] uppercase tracking-widest text-purple-500/40 font-bold hover:text-purple-400 transition-colors mt-auto">
                            Read Full Post →
                        </Link>
                    </div>

                    {/* Bottom action bar */}
                    <div className="px-7 pb-7 flex items-center gap-3">
                        <form action={formAction} className="flex-1">
                            <input type="hidden" name="blog-id" value={blog._id.toString()} />
                            <button
                                type="submit"
                                disabled={isPending}
                                className={`w-full py-3 text-[10px] uppercase tracking-[0.15em] font-black rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                                    isPending ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110 active:scale-[0.98]'
                                }`}
                            >
                                {isPending ? (
                                    <>
                                        <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>🧠 Intelligence</>
                                )}
                            </button>
                        </form>

                        <form action={DeleteBlogAction}>
                            <input type="hidden" name="blog-id" value={blog._id.toString()} />
                            <button
                                type="submit"
                                className="h-[46px] w-[46px] flex items-center justify-center rounded-xl bg-red-500/5 text-red-500/40 hover:bg-red-500 hover:text-white border border-red-500/10 hover:border-red-500 transition-all duration-300 text-sm"
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
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="max-w-2xl w-full glass-card p-8 md:p-12 border-purple-500/40 shadow-[0_30px_60px_rgba(168,85,247,0.25)] animate-in zoom-in-95 duration-500">
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white text-xl font-black shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                                    AI
                                </div>
                                <div>
                                    <h3 className="text-[12px] font-black text-purple-400 uppercase tracking-[0.3em] mb-1">Intelligence Report</h3>
                                    <p className="text-xs text-gray-500">Generated by Gemini Advanced</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-all"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="text-base md:text-lg leading-relaxed text-gray-200 bg-white/5 p-6 md:p-8 rounded-2xl border border-white/5 italic">
                                "{state.message}"
                            </div>
                            <button 
                                onClick={() => window.location.reload()}
                                className="w-full py-4 text-xs uppercase tracking-widest font-black bg-white/5 hover:bg-white/10 border-white/10 transition-all"
                            >
                                Close Report
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
