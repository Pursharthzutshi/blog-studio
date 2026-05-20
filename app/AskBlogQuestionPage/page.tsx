"use client"

import { useActionState } from "react";
import { AskBlogQuestion } from "../(actions)/rag";
import FetchQuestionsAndAnswers from "./fetchQuestionsAndAnswers";

export default function AskBlogQuestionPage() {


    const initialState: any = {
        state: "",
        message: "",
        data: null
    }


    const [state, formAction, isPending] = useActionState(AskBlogQuestion, initialState)


    return (
        <>
            <form action={formAction}>
                <input placeholder="ask a question" name="userQuestion" type="text" />
                <button type="submit">Ask</button>

                {
                    isPending ? <p>Loading...</p> : <p>{state.message}</p>
                }
            </form>


            <FetchQuestionsAndAnswers />
        </>
    )
}