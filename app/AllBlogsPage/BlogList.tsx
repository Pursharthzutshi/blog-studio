"use client"

import { useActionState } from "react"
import Link from "next/link"
import { AnalyzeBlogAction } from "../(actions)/analyze"
import { DeleteBlogAction } from "../(actions)/blog"

export default function BlogList({ blogs }: { blogs: any[] }) {
    const initialState = { state: "", message: "", data: null }
    const [state, formAction, isPending] = useActionState(AnalyzeBlogAction, initialState)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
            {blogs.map((blog) => (
                <div key={blog._id.toString()} className="card flex flex-col group hover:border-[var(--border-active)] transition-all duration-300" style={{ minHeight: '340px' }}>
                    {/* Top accent — visible on hover */}
                    <div className="h-[2px] w-full rounded-t-[16px] bg-transparent group-hover:bg-[var(--accent)] transition-all duration-500" />

                    {/* Card body */}
                    <div className="p-6 flex-1 flex flex-col gap-3">
                        {/* ID badge */}
                        <div className="flex justify-between items-center">
                            <span className="badge text-[10px]">
                                #{blog._id.toString().slice(-6).toUpperCase()}
                            </span>
                        </div>

                        {/* Title */}
                        <Link href={`/blog/${blog._id.toString()}`}>
                            <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug hover:text-[var(--accent)] transition-colors cursor-pointer" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {blog.title || 'Untitled Blog'}
                            </h3>
                        </Link>

                        {/* Separator */}
                        <div className="h-px bg-[var(--border)]" />

                        {/* Description */}
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1" style={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {blog.description || 'No description available.'}
                        </p>

                        {/* Read More */}
                        <Link href={`/blog/${blog._id.toString()}`} className="text-xs text-[var(--accent)] font-semibold hover:underline mt-auto">
                            Read more →
                        </Link>
                    </div>

                    {/* Bottom action bar */}
                    <div className="px-6 pb-5 flex items-center gap-2">
                        <form action={formAction} className="flex-1">
                            <input type="hidden" name="blog-id" value={blog._id.toString()} />
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full py-2.5 text-xs font-semibold rounded-lg bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                            >
                                {isPending ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="spinner spinner-light" style={{ width: '12px', height: '12px' }} />
                                        Analyzing...
                                    </span>
                                ) : (
                                    <>📊 Analyze</>
                                )}
                            </button>
                        </form>

                        <form action={DeleteBlogAction}>
                            <input type="hidden" name="blog-id" value={blog._id.toString()} />
                            <button
                                type="submit"
                                className="h-[38px] w-[38px] flex items-center justify-center rounded-lg bg-transparent text-[var(--text-muted)] hover:bg-[var(--danger)] hover:text-white border border-[var(--border)] hover:border-[var(--danger)] transition-all text-xs"
                                title="Delete Blog"
                            >
                                ✕
                            </button>
                        </form>
                    </div>
                </div>
            ))}

            {/* Analysis result overlay */}
            {state?.message && !isPending && (
                <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-6" style={{ backdropFilter: 'blur(8px)' }}>
                    <div className="max-w-2xl w-full card p-8 md:p-10 border-[var(--border-active)] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-[var(--accent)] flex items-center justify-center text-black text-sm font-black">
                                    AI
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">Analysis Report</h3>
                                    <p className="text-[11px] text-[var(--text-muted)]">Powered by Gemini</p>
                                </div>
                            </div>
                            <button
                                onClick={() => window.location.reload()}
                                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all text-xs border-none"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="text-sm leading-relaxed text-[var(--text-secondary)] bg-[var(--bg-surface)] p-5 rounded-xl border border-[var(--border)] whitespace-pre-wrap">
                                {state.message}
                            </div>
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-3 text-xs font-semibold bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all rounded-xl"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
