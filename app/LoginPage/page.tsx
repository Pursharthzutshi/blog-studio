"use client"

import { useActionState } from "react"
import { LoginUser } from "../(actions)/auth"

export default function LoginPage() {

    const initialState: any = {
        state: "",
        message: "",
        data: null
    }

    const [state, formAction, isPending] = useActionState(LoginUser, initialState)

    return (
        <>
            <form action={formAction}>
                <input type="text" placeholder="emailID" name="email-id" />
                <input type="text" placeholder="password" name="password" />

                <button type="submit">Login</button>
            </form>
            {
                isPending ? <p>Loading...</p> : <p>{state.message}</p>
            }
        </>

    )
}

