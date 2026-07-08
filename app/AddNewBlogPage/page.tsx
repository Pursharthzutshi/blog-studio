"use client"

import { useActionState } from "react"
import Link from "next/link"
import { InsertBlog } from "../(actions)/blog"

export default function AddNewBlog() {
    const initialState: any = {
        state: "",
        message: "",
        data: null
    }

    const [state, formAction, isPending] = useActionState(InsertBlog, initialState)

    return (
        <div className="max-w-3xl w-full" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
            <div className="space-y-3 mb-10">
                <div className="accent-line mb-6" />
                <h1 className="text-3xl font-bold tracking-tight">
                    Write Manually
                </h1>
                <p className="text-sm text-[var(--text-muted)] max-w-lg">
                    Sometimes the human touch is irreplaceable. Craft your story here.
                </p>
            </div>

            <div className="card" style={{ padding: '48px' }}>
                <form action={formAction} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider ml-0.5">
                            Title
                        </label>
                        <input
                            placeholder="Enter a compelling title"
                            type="text"
                            name="blog-title"
                            className="text-base py-3.5"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider ml-0.5">
                            Content
                        </label>
                        <textarea
                            placeholder="Write your blog content here..."
                            name="blog-description"
                            className="min-h-[280px] resize-none py-3.5 leading-relaxed"
                            required
                        />
                    </div>

                    <button type="submit" disabled={isPending} className="w-full py-3.5 text-sm font-bold">
                        {isPending ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="spinner" style={{ width: '14px', height: '14px' }} />
                                Publishing...
                            </span>
                        ) : "Publish →"}
                    </button>
                </form>

                {state?.message && (
                    <div className={`mt-6 p-4 rounded-xl text-left text-sm font-medium border ${state.state === "error"
                            ? "bg-red-500/5 text-[var(--danger)] border-red-500/15"
                            : "bg-green-500/5 text-[var(--success)] border-green-500/15"
                        }`}>
                        {state?.state === "success" ? (
                            <span className="flex flex-col gap-1">
                                <span>✓ Blog published successfully!</span>
                                <span className="text-xs text-[var(--text-muted)] font-normal">
                                    Check it out on the{" "}
                                    <Link href="/AllBlogsPage" className="underline underline-offset-2 text-[var(--accent)] hover:opacity-80 transition-opacity">
                                        Explore page
                                    </Link>
                                    {" "}where all blogs are listed.
                                </span>
                            </span>
                        ) : state?.message}
                    </div>
                )}
            </div>
        </div>
    )
}