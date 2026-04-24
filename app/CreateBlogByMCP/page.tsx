"use client"

import { useActionState } from "react"
import { LoginUser } from "../(actions)/auth"
import { CreateBlogWithMCP } from "../(actions)/createblogwithmcp"

export default function CreateBlogByMCPPage() {
    const initialState: any = {
        state: "",
        message: "",
        data: null
    }

    const [state, formAction, isPending] = useActionState(CreateBlogWithMCP, initialState)

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                  AI Content Studio
                </h1>
                <p>Describe your vision and let Gemini 2.5 transform it into a full professional blog post.</p>
            </div>

            <div className="glass-card p-8 space-y-6">
                <form action={formAction} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Blog Title</label>
                        <input 
                            type="text" 
                            placeholder="e.g. The Future of Quantum Computing" 
                            name="title" 
                            required
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Prompt / Subject Description</label>
                        <input 
                            type="text" 
                            placeholder="What should this blog be about?" 
                            name="description" 
                            required
                        />
                    </div>

                    <button type="submit" disabled={isPending} className="w-full h-12">
                        {isPending ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-pulse">Writing your blog...</span>
                            </span>
                        ) : (
                            "Generate with AI"
                        )}
                    </button>
                </form>

                {state.message && (
                    <div className={`p-4 rounded-xl text-center text-sm ${state.state === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-green-500/10 text-green-400 border border-green-500/20"}`}>
                        {state.message}
                    </div>
                )}
            </div>
        </div>
    )
}

