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
        <div className="max-w-[460px] w-full" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
            <div className="text-left space-y-3 mb-10">
                <div className="accent-line mb-6" />
                <h1 className="text-3xl font-bold tracking-tight">
                    Create an account
                </h1>
                <p className="text-sm text-[var(--text-muted)]">
                    Start creating AI-powered content today.
                </p>
            </div>

            <div className="card" style={{ padding: '48px' }}>
                <form action={formAction} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider ml-0.5">Name</label>
                            <input type="text" name="name" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider ml-0.5">Age</label>
                            <input type="number" name="age" placeholder="25" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider ml-0.5">Email</label>
                        <input type="email" name="email-id" placeholder="you@example.com" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider ml-0.5">Password</label>
                        <input type="password" name="password" placeholder="••••••••" required />
                    </div>

                    <button type="submit" disabled={isPending} className="w-full py-3 text-sm font-bold mt-2">
                        {isPending ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="spinner" style={{ width: '14px', height: '14px' }} />
                                Creating...
                            </span>
                        ) : "Create Account"}
                    </button>
                </form>

                {state?.message && (
                    <div className={`mt-6 p-3.5 rounded-xl text-left text-xs font-medium border ${
                        state.state === "error"
                        ? "bg-red-500/5 text-[var(--danger)] border-red-500/15"
                        : "bg-green-500/5 text-[var(--success)] border-green-500/15"
                    }`}>
                        {state.message}
                    </div>
                )}
            </div>

            <p className="text-left mt-6 text-sm text-[var(--text-muted)]">
                Already have an account?{" "}
                <Link href="/LoginPage" className="text-[var(--accent)] hover:underline font-medium">
                    Sign in
                </Link>
            </p>
        </div>
    )
}