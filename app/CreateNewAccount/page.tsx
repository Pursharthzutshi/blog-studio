"use client"

import { useActionState } from "react"
import { CreateNewUserAccount } from "../(actions)/auth"
import Link from "next/link"

export default function CreateNewAccount() {
    const initialState: any = {
        state: "",
        message: "",
        data: null
    }

    const [state, formAction, isPending] = useActionState(CreateNewUserAccount, initialState)

    return (
        <div className="max-w-[480px] mx-auto w-full">
            <div className="text-center space-y-4 mb-10">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                    Join the Studio
                </h1>
                <p className="text-gray-400">
                    Empower your content with Next-Gen AI capabilities.
                </p>
            </div>

            <div className="glass-card p-10 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/10 blur-[80px] rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/10 blur-[80px] rounded-full" />

                <form action={formAction} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                            <input type="text" name="name" placeholder="John Doe" required className="bg-white/5 border-white/5 focus:bg-white/10" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Age</label>
                            <input type="number" name="age" placeholder="25" required className="bg-white/5 border-white/5 focus:bg-white/10" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">@</span>
                            <input type="email" name="email-id" placeholder="you@example.com" required className="pl-11 bg-white/5 border-white/5 focus:bg-white/10" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Password</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">🔒</span>
                            <input type="password" name="password" placeholder="••••••••" required className="pl-11 bg-white/5 border-white/5 focus:bg-white/10" />
                        </div>
                    </div>

                    <button type="submit" disabled={isPending} className="w-full py-4 text-sm uppercase tracking-widest font-black">
                        {isPending ? "Creating Space..." : "Initalize Account"}
                    </button>
                </form>

                {state?.message && (
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
                Already part of the studio?{" "}
                <Link href="/LoginPage" className="text-white font-semibold hover:text-purple-400 transition-colors">
                    Sign in here
                </Link>
            </p>
        </div>
    )
}