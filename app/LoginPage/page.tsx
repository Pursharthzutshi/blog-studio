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
        <div className="max-w-[420px] mx-auto w-full pt-8">
            <div className="text-center space-y-3 mb-10">
                <div className="accent-line mx-auto mb-6" />
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome back
                </h1>
                <p className="text-sm text-[var(--text-muted)]">
                    Sign in to continue creating.
                </p>
            </div>

            <div className="card p-8">
                <form action={formAction} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider ml-0.5">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            name="email-id"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider ml-0.5">
                                Password
                            </label>
                            <Link href="#" className="text-[11px] text-[var(--accent)] hover:underline font-medium">
                                Forgot?
                            </Link>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            name="password"
                            required
                        />
                    </div>

                    <button type="submit" disabled={isPending} className="w-full py-3 text-sm font-bold mt-2">
                        {isPending ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="spinner" style={{ width: '14px', height: '14px' }} />
                                Signing in...
                            </span>
                        ) : "Sign In"}
                    </button>
                </form>

                {state.message && (
                    <div className={`mt-6 p-3.5 rounded-xl text-center text-xs font-medium border ${
                        state.state === "error"
                        ? "bg-red-500/5 text-[var(--danger)] border-red-500/15"
                        : "bg-green-500/5 text-[var(--success)] border-green-500/15"
                    }`}>
                        {state.message}
                    </div>
                )}
            </div>

            <p className="text-center mt-6 text-sm text-[var(--text-muted)]">
                Don&apos;t have an account?{" "}
                <Link href="/CreateNewAccount" className="text-[var(--accent)] hover:underline font-medium">
                    Sign up
                </Link>
            </p>
        </div>
    )
}
