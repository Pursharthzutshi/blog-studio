
// "use server"
import { useEffect, useState } from "react";
import { FetchRecentQuestionsAndAnswers } from "../(actions)/blog";

export default function FetchQuestionsAndAnswers() {

    const [questionsAndAnswers, setQuestionsAndAnswers] = useState<any[]>([]);

    useEffect(() => {
        const loadQuestions = async () => {
            const result = await FetchRecentQuestionsAndAnswers();
            setQuestionsAndAnswers(result.data);
        };

        loadQuestions();
    }, []);


    return (
        <>
            <h3>Recent Questions</h3>
            <div className="border border-[var(--border)] p-4 rounded-xl">
                {
                    questionsAndAnswers.map((val: any, idx: number) => {
                        return (
                            <div key={idx} className="mb-2">
                                <p className="font-semibold">Q:{val.userQuestion}</p>
                                <p className="text-gray-600">A:{val.aiResponse}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}