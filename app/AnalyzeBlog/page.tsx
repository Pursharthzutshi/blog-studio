"use client"

import { useActionState } from "react"
import { AnalyzeBlogAction } from "../(actions)/analyze"

export default function AnalyzeBlog() {
    const initialState: any = {
        state: "",
        message: "",
        data: null
    }

    const [state, formAction, isPending] = useActionState(AnalyzeBlogAction, initialState)

    return (
        <div className="max-w-2xl mx-auto w-full pt-8">
            <div className="space-y-3 mb-10">
                <div className="accent-line mb-6" />
                <h1 className="text-3xl font-bold tracking-tight">
                    Blog Analysis
                </h1>
                <p className="text-sm text-[var(--text-muted)] max-w-lg">
                    Enter a blog ID and get an AI-driven content analysis in seconds.
                </p>
            </div>

            <div className="card p-8">
                <form action={formAction} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider ml-0.5">
                            Blog ID
                        </label>
                        <input
                            name="blog-id"
                            type="text"
                            placeholder="Paste the blog's MongoDB ID"
                            className="font-mono tracking-wider"
                            required
                        />
                    </div>

                    <button type="submit" disabled={isPending} className="w-full py-3.5 text-sm font-bold">
                        {isPending ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="spinner" style={{ width: '14px', height: '14px' }} />
                                Analyzing...
                            </span>
                        ) : "Analyze →"}
                    </button>
                </form>

                {state?.message && !isPending && (
                    <div className={`mt-6 rounded-xl border ${
                        state.state === 'error'
                        ? 'bg-red-500/5 border-red-500/15'
                        : 'bg-[var(--bg-surface)] border-[var(--border)]'
                    }`}>
                        <div className="flex items-center gap-2 px-5 pt-4 pb-2">
                            <div className="accent-line" style={{ width: '20px', height: '2px' }} />
                            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Analysis Report</span>
                        </div>
                        <p className="px-5 pb-5 leading-relaxed whitespace-pre-wrap text-sm text-[var(--text-secondary)]">
                            {state.message}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
