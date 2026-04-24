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
        <div>
            <h2>Analyze a Blog</h2>
            <form action={formAction}>
                <input name="blog-id" type="text" placeholder="Enter Blog ID" />
                <button type="submit">Analyze</button>
            </form>

            {isPending ? <p>Loading Analysis...</p> : <p>{state?.message}</p>}
        </div>
    )
}

