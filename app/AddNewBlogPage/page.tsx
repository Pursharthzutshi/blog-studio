"use client"

import { useActionState } from "react"
import { InsertBlog } from "../(actions)/blog"

export default function AddNewBlog() {
    const initialState: any = {
        state: "",
        message: "",
        data: null
    }

    // Clean — no need to fetch user token on the client anymore.
    // InsertBlog reads the session cookie directly on the server.
    const [state, formAction, isPending] = useActionState(InsertBlog, initialState)

    return (
        <div className="max-w-3xl mx-auto w-full">
            <div className="text-center space-y-4 mb-12">
                <h1 className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                    Manual Entry
                </h1>
                <p className="max-w-md mx-auto">
                    Sometimes the human touch is irreplaceable. Craft your story manually here.
                </p>
            </div>

            <div className="glass-card p-10 relative overflow-hidden">
                <form action={formAction} className="space-y-8 relative z-10">
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                            Article Title
                        </label>
                        <input
                            placeholder="Enter a compelling title"
                            type='text'
                            name="blog-title"
                            className="bg-white/5 border-white/5 focus:bg-white/10 text-lg py-4"
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                            Body Content
                        </label>
                        <textarea
                            placeholder="Type or paste your blog content here..."
                            name="blog-description"
                            className="min-h-[300px] bg-white/5 border-white/5 focus:bg-white/10 resize-none py-4 leading-relaxed"
                            required
                        />
                    </div>

                    <button type="submit" disabled={isPending} className="w-full py-5 text-sm uppercase tracking-[0.2em] font-black group">
                        {isPending ? "Publishing..." : "Publish to Community"}
                    </button>
                </form>

                {state?.message && (
                    <div className={`mt-10 p-6 rounded-2xl text-center text-sm font-medium border animate-in zoom-in-95 duration-500 ${state.state === "error"
                        ? "bg-red-500/5 text-red-400 border-red-500/10"
                        : "bg-green-500/5 text-green-400 border-green-500/10"
                        }`}>
                        {state?.state === "success" ? "✓ Blog published successfully!" : state?.message}
                    </div>
                )}
            </div>
        </div>
    )
}