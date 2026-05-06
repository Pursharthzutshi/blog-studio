import { RagBlogQuestionAction } from '@/app/mcp'
import React, { useActionState } from 'react'


export default function HomePageSearchBar() {
    const initialState: any = { state: "", message: "", data: null }

    const [state, formAction, isPending] = useActionState(RagBlogQuestionAction, initialState)

    return (
        <form action={formAction}>
            <input type="text" name='userQuestion' />
        </form>
    )
}