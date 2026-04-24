"use client"

import { useActionState } from "react"
import { CreateNewUserAccount } from "../(actions)/auth"

export default function CreateNewAccount() {

    const initialState: any = {
        state: "",
        message: "",
        data: null
    }

    const [state, formAction, isPending] = useActionState(CreateNewUserAccount, initialState)

    return (
        <div>
            <h3>Create New Account</h3>
            <form action={formAction}>
                <input type="text" name="name" placeholder="name" />
                <input type="number" name="age" placeholder="age" />
                <input type="text" name="email-id" placeholder="email id" />
                <input type="text" name="password" placeholder="password" />
                <button type="submit">Create New Account</button>
            </form>
            
            { isPending ? <p>Loading...</p> : <p>{state?.message}</p> }
        </div>
    )
}