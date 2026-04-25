"use client"

import { useActionState } from "react"
import { LoginUser } from "../(actions)/auth"
import Link from "next/link"

export default function LoginPage() {
    const initialState: any = {
        state: "",
        message: "",
        data: null
    }

    const [state, formAction, isPending] = useActionState(LoginUser, initialState)

    return (
        <div className="max-w-[440px] mx-auto w-full">
            <div className="text-center space-y-4 mb-10">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                    Welcome Back
                </h1>
                <p className="text-gray-400">
                    Sign in to your account and continue creating.
                </p>
            </div>

            <div className="glass-card p-10 relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/10 blur-[80px] rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/10 blur-[80px] rounded-full" />

                <form action={formAction} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                            Email Address
                        </label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
                                @
                            </span>
                            <input 
                                type="email" 
                                placeholder="you@example.com" 
                                name="email-id" 
                                className="pl-11"
                                required 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                Password
                            </label>
                            <Link href="#" className="text-[10px] uppercase tracking-widest font-black text-purple-500 hover:text-purple-400">
                                Forgot?
                            </Link>
                        </div>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
                                🔒
                            </span>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                name="password" 
                                className="pl-11"
                                required 
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={isPending} className="w-full py-4 text-sm uppercase tracking-widest font-black">
                        {isPending ? "Authenticating..." : "Sign In to Studio"}
                    </button>
                </form>

                {state.message && (
                    <div className={`mt-8 p-4 rounded-2xl text-center text-xs font-medium border animate-in fade-in slide-in-from-top-4 ${
                        state.state === "error" 
                        ? "bg-red-500/5 text-red-400 border-red-500/20" 
                        : "bg-green-500/5 text-green-400 border-green-500/20"
                    }`}>
                        {state.message}
                    </div>
                )}
            </div>

            <p className="text-center mt-8 text-sm text-gray-500">
                Don't have an account?{" "}
                <Link href="/CreateNewAccount" className="text-white font-semibold hover:text-purple-400 transition-colors">
                    Join the community
                </Link>
            </p>
        </div>
    )
}

