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
        <div className="max-w-[420px] mx-auto w-full pt-8">
            <form action={formAction}>
                <button type="submit" disabled={isPending}>
                    {isPending ? "Logging out..." : "Logout"}
                </button>
            </form>
        </div>
    )
}
