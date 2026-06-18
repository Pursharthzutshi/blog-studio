"use client"

import { useActionState } from "react"
import { LogoutUser } from "../(actions)/auth"

export default function LogoutPage() {
    const initialState: any = {
        state: "",
        message: "",
        data: null
    }

    const [state, formAction, isPending] = useActionState(LogoutUser, initialState)

    return (
        <form action={formAction} className="w-full">
            <button type="submit" disabled={isPending} className="h-10 w-10 flex items-center justify-center rounded-xl bg-[rgba(255,255,255,0.05)] text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-all mx-auto">
                {isPending ? (
                    <span className="spinner spinner-light !w-4 !h-4" />
                ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                )}
            </button>
        </form>
    )
}
