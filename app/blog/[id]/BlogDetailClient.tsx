"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { RewriteBlogInDB } from "@/app/lib/dal/blog"
import { RewriteBlogWithMCP } from "@/app/(actions)/rewriteblogwithmcp"

type BlogData = {
    id: string
    title: string
    description: string
    emailId: string
}

export default function BlogDetailClient({ blog }: { blog: BlogData }) {

    const initialState: any | null = {
        state: "",
        message: "",
        data: null
    }

    const [highlightedText, setHighlightedText] = useState<string>("")
    const [state, formAction, isPending] = useActionState(RewriteBlogWithMCP.bind(null, highlightedText, blog.id), initialState)

    // const handleTextSelection = () => {
    //     const selected = window.getSelection()?.toString() || ""
    //     if (selected.trim()) {
    //         setHighlightedText(selected.trim())
    //         console.log("Selected text:", selected.trim())
    //     }
    // }

    console.log(state)

    const highlightText = () => {
        const selected = window.getSelection()?.toString() || ""
        if (selected.trim()) {
            setHighlightedText(selected.trim())
            console.log("Selected text:", selected.trim())
        }
    }

    return (
        <div className="py-12 max-w-3xl mx-auto">
            {/* Back button */}
            <Link
                href="/AllBlogsPage"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500 hover:text-purple-400 transition-colors mb-12 group"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                Back to All Blogs
            </Link>

            <article className="glass-card p-10 md:p-14 space-y-8">
                {/* Header */}
                <div className="space-y-5 pb-8 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
                            #{blog.id.slice(-6).toUpperCase()}
                        </span>
                        {blog.emailId && (
                            <>
                                <span className="text-gray-700">·</span>
                                <span className="text-[10px] text-gray-600 truncate">{blog.emailId}</span>
                            </>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        {blog.title}
                    </h1>
                </div>

                {/* Full blog content — select text to highlight */}
                <div
                    onMouseUp={highlightText}
                    onTouchEnd={highlightText}
                    className="prose-content space-y-5 cursor-text select-text"
                >
                    {blog.description
                        .split(/\n\n+/)
                        .filter((para) => para.trim())
                        .map((para, i) => (

                            <p key={i} className="text-gray-300 text-base md:text-lg leading-relaxed">
                                {para.trim()}
                            </p>
                        ))
                    }
                </div>

                <form action={formAction}>

                    {
                        highlightedText.length > 0 && <button type="submit">Refine this text</button>
                    }

                </form>

                {/* Highlighted text indicator */}
                {highlightedText && (
                    <div className="mt-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-purple-400">
                            ✦ Selected Text
                        </p>
                        <p className="text-sm text-gray-300 italic">"{highlightedText}"</p>
                        <button
                            onClick={() => setHighlightedText("")}
                            className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
                        >
                            Clear
                        </button>
                    </div>
                )}
            </article>

            {/* Bottom nav */}
            <div className="mt-12 flex justify-between items-center">
                <Link
                    href="/AllBlogsPage"
                    className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500 hover:text-white transition-colors"
                >
                    ← All Blogs
                </Link>
                <Link
                    href="/CreateBlogByMCP"
                    className="btn py-3 px-8 text-[11px] uppercase tracking-[0.2em]"
                >
                    ✦ Create with AI
                </Link>
            </div>
        </div>
    )
}
