"use client"

import { useActionState, useEffect, useState } from "react"
import Link from "next/link"
import { RewriteBlogWithMCP } from "@/app/(actions)/rewriteblogwithmcp"
import { useRouter } from "next/navigation"

type BlogData = {
    id: string
    title: string
    description: string
    emailId: string
}

export default function BlogDetailClient({ blog }: { blog: BlogData }) {
    const initialState: any = {
        state: "",
        message: "",
        data: null
    }

    const [highlightedText, setHighlightedText] = useState<string>("")
    const [state, formAction, isPending] = useActionState(RewriteBlogWithMCP.bind(null, highlightedText, blog.id), initialState)

    const router = useRouter();

    useEffect(() => {
        if (state.state === "success") {
            setHighlightedText("")
            router.refresh();
        }
    }, [state])

    const highlightText = () => {
        const selected = window.getSelection()?.toString() || ""
        if (selected.trim()) {
            setHighlightedText(selected.trim())
        }
    }

    return (
        <div className="py-8 max-w-3xl mx-auto">
            {/* Back button */}
            <Link
                href="/AllBlogsPage"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-10"
            >
                ← Back to All Blogs
            </Link>

            <article className="card p-8 md:p-12 space-y-8">
                {/* Header */}
                <div className="space-y-4 pb-6 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3">
                        <span className="badge text-[10px]">
                            #{blog.id.slice(-6).toUpperCase()}
                        </span>
                        {blog.emailId && (
                            <span className="text-[11px] text-[var(--text-muted)]">{blog.emailId}</span>
                        )}
                    </div>

                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight">
                        {blog.title}
                    </h1>
                </div>

                {/* Blog content — select text to highlight */}
                <div
                    onMouseUp={highlightText}
                    onTouchEnd={highlightText}
                    className="prose-content cursor-text select-text space-y-4"
                >
                    {blog.description
                        .split(/\n\n+/)
                        .filter((para) => para.trim())
                        .map((para, i) => (
                            <p key={i}>{para.trim()}</p>
                        ))
                    }
                </div>

                {/* Refine form */}
                {highlightedText && (
                    <div className="p-5 rounded-xl bg-[var(--accent-soft)] border border-[rgba(245,158,11,0.2)] space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                                ✦ Selected Text
                            </p>
                            <button
                                onClick={() => setHighlightedText("")}
                                className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors border-none bg-transparent px-0 py-0"
                            >
                                Clear
                            </button>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed">
                            &ldquo;{highlightedText}&rdquo;
                        </p>
                        <form action={formAction}>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="py-2.5 px-6 text-xs font-bold rounded-lg"
                            >
                                {isPending ? (
                                    <span className="flex items-center gap-2">
                                        <span className="spinner" style={{ width: '12px', height: '12px' }} />
                                        Refining...
                                    </span>
                                ) : (
                                    "Refine with AI →"
                                )}
                            </button>
                        </form>

                        {state?.message && (
                            <p className={`text-xs font-medium ${state.state === 'success' ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
                                {state.message}
                            </p>
                        )}
                    </div>
                )}
            </article>

            {/* Bottom nav */}
            <div className="mt-10 flex justify-between items-center">
                <Link
                    href="/AllBlogsPage"
                    className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                    ← All Blogs
                </Link>
                <Link
                    href="/CreateBlogByMCP"
                    className="btn-primary py-2.5 px-6 text-xs font-bold rounded-lg"
                >
                    ✦ Create with AI
                </Link>
            </div>
        </div>
    )
}
