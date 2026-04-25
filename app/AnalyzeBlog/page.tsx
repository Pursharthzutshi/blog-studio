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
        <div className="max-w-3xl mx-auto w-full">
            <div className="text-center space-y-4 mb-12">
                <h1 className="bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
                    Blog Intelligence
                </h1>
                <p className="max-w-xl mx-auto">
                    Decrypt the DNA of your content. Enter a Blog ID for a comprehensive AI-driven analysis.
                </p>
            </div>

            <div className="glass-card p-10 relative overflow-hidden group">
                <form action={formAction} className="space-y-8 relative z-10">
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">
                            Blog Identifier (ID)
                        </label>
                        <div className="relative group">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl opacity-30 group-focus-within:opacity-100 group-focus-within:text-purple-500 transition-all">#</span>
                            <input 
                                name="blog-id" 
                                type="text" 
                                placeholder="64f1..." 
                                className="pl-12 bg-white/5 border-white/5 focus:bg-white/10 font-mono tracking-wider"
                                required
                            />
                        </div>
                    </div>
                    
                    <button type="submit" disabled={isPending} className="w-full py-5 text-sm uppercase tracking-[0.3em] font-black">
                        {isPending ? (
                            <span className="flex items-center justify-center gap-4">
                                <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                <span>Scanning Data...</span>
                            </span>
                        ) : "Initiate Deep Analysis"}
                    </button>
                </form>

                {state?.message && !isPending && (
                    <div className={`mt-10 p-8 rounded-2xl border animate-in slide-in-from-bottom-8 duration-700 ${
                        state.state === 'error' 
                        ? 'bg-red-500/5 border-red-500/10 text-red-400' 
                        : 'bg-purple-500/5 border-purple-500/10 text-gray-100'
                    }`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-6 w-px bg-purple-500" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Intelligence Report</h3>
                        </div>
                        <p className="leading-relaxed whitespace-pre-wrap text-sm text-gray-200 bg-black/20 p-6 rounded-xl border border-white/5">
                            {state.message}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

