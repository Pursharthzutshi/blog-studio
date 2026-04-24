"use client"

import { useActionState } from "react"
import { InsertBlog } from "../(actions)/blog";

export default function AddNewBlog() {

    const initialState: any = {
        state: "",
        message: "",
        data: null
    }

    const [state, formAction, isPending] = useActionState(InsertBlog, initialState);

    return (
        <>
            <div>Add New Blog</div>
            <form action={formAction}>
                <input placeholder="enter blog title" type='text' name="blog-title" />
                <input placeholder="enter blog description" type='text' name="blog-description" />
                <button type="submit"> Submit Blog</button>

                {
                    isPending ? <p>Loading</p> : <p>{state?.state === "success" ? "Success!" : state?.message}</p>
                }
            </form>
        </>

    )
}