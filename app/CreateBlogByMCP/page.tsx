"use client"

import { useActionState } from "react"
import { CreateBlogWithMCP } from "../(actions)/createblogwithmcp"

export default function CreateBlogByMCPPage() {
    const initialState: any = {
        state: "",
        message: "",
        data: null
    }

    const [state, formAction, isPending] = useActionState(CreateBlogWithMCP, initialState)

    return (
        <div className="max-w-3xl w-full" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
            <div className="space-y-3 mb-10">
                <div className="accent-line mb-6" />
                <h1 className="text-3xl font-bold tracking-tight">
                    AI Studio
                </h1>
                <p className="text-sm text-[var(--text-muted)] max-w-lg">
                    Describe your vision and let Gemini craft the perfect blog post for you.
                </p>
            </div>

            <div className="card" style={{ padding: '48px' }}>
                <div className="flex items-center gap-2 mb-6">
                    <div className="h-2 w-2 rounded-full bg-[var(--success)] animate-pulse" />
                    <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">System Ready</span>
                </div>

                <form action={formAction} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider ml-0.5 flex items-center gap-2">
                            Title
                            <span className="text-[10px] text-[var(--text-muted)] font-normal normal-case tracking-normal">— the main headline</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. The Future of Sustainable Energy"
                            name="title"
                            className="text-base py-3.5"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider ml-0.5 flex items-center gap-2">
                            Brief
                            <span className="text-[10px] text-[var(--text-muted)] font-normal normal-case tracking-normal">— tone, audience, key points</span>
                        </label>
                        <textarea
                            placeholder="Detail what you want the AI to cover. The more context, the better."
                            name="description"
                            className="min-h-[160px] resize-none py-3.5"
                            required
                        />
                    </div>

                    <button type="submit" disabled={isPending} className="w-full py-3.5 text-sm font-bold">
                        {isPending ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="spinner" style={{ width: '14px', height: '14px' }} />
                                Generating...
                            </span>
                        ) : "Generate Blog →"}
                    </button>
                </form>

                {state.message && (() => {
                    const isRefused = state.message.startsWith("REFUSED:")
                    const isSuccess = state.state === "success"

                    if (isSuccess) {
                        return (
                            <div className="mt-6 p-4 rounded-xl text-left text-sm font-medium border bg-green-500/5 text-[var(--success)] border-green-500/15">
                                ✓ Blog generated successfully!
                            </div>
                        )
                    }

                    if (isRefused) {
                        return (
                            <div className="mt-6 p-4 rounded-xl text-left text-sm font-medium border bg-amber-500/5 border-amber-500/20">
                                <div className="flex items-start gap-3">
                                    <span className="text-base leading-none mt-0.5">⚠️</span>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-amber-400">Content Not Allowed</p>
                                        <p className="text-[var(--text-muted)] font-normal text-xs leading-relaxed">
                                            {state.message.replace("REFUSED:", "").trim()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    return (
                        <div className="mt-6 p-4 rounded-xl text-left text-sm font-medium border bg-red-500/5 text-[var(--danger)] border-red-500/15">
                            {state.message}
                        </div>
                    )
                })()}
            </div>
        </div>
    )
}
