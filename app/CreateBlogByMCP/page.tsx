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
        <div className="max-w-3xl mx-auto w-full">
            <div className="text-center space-y-4 mb-12">
                <h1 className="bg-gradient-to-r from-white via-indigo-200 to-purple-400 bg-clip-text text-transparent">
                  AI Content Studio
                </h1>
                <p className="max-w-xl mx-auto">
                    Describe your vision and let our hyper-tuned Gemini model transform it into a professional masterpiece.
                </p>
            </div>

            <div className="glass-card p-10 relative overflow-hidden group">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] -z-10 rounded-full transition-all duration-700 group-focus-within:bg-purple-500/10" />

                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">System Ready</span>
                    </div>
                    <span className="bg-white/5 text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest text-purple-400">
                        Gemini 1.5 <span className="opacity-50 ml-1">Flash</span>
                    </span>
                </div>

                <form action={formAction} className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-white/80 ml-1 flex items-center gap-2">
                            <span>Headline Vision</span>
                            <span className="text-[10px] text-gray-500 font-normal">What's the main hook?</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="e.g. The Quantum Leap in Sustainable Energy" 
                            name="title" 
                            className="bg-white/5 border-white/5 focus:bg-white/10 text-lg py-4"
                            required
                        />
                    </div>
                    
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-white/80 ml-1 flex items-center gap-2">
                            <span>Creative Brief</span>
                            <span className="text-[10px] text-gray-500 font-normal">Tone, audience, key points...</span>
                        </label>
                        <textarea 
                            placeholder="Detail exactly what you want the AI to cover. The more context, the better the result." 
                            name="description" 
                            className="min-h-[180px] bg-white/5 border-white/5 focus:bg-white/10 resize-none py-4"
                            required
                        />
                    </div>

                    <button type="submit" disabled={isPending} className="w-full py-5 text-sm uppercase tracking-[0.2em] font-black group">
                        {isPending ? (
                            <span className="flex items-center justify-center gap-4">
                                <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                <span className="animate-pulse">Engineering Content...</span>
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                Launch Generation
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        )}
                    </button>
                </form>

                {state.message && (
                    <div className={`mt-10 p-6 rounded-2xl text-center text-sm font-medium border animate-in zoom-in-95 duration-500 ${
                        state.state === "error" 
                        ? "bg-red-500/5 text-red-400 border-red-500/10" 
                        : "bg-green-500/5 text-green-400 border-green-500/10"
                    }`}>
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-widest opacity-50">Studio Response</span>
                            {state.message}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

