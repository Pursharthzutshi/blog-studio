
"use client"

import { useEffect, useState } from "react";
import { FetchRecentQuestionsAndAnswers } from "../(actions)/blog";
import ReactMarkdown from "react-markdown";

export default function FetchQuestionsAndAnswers() {
    const [questionsAndAnswers, setQuestionsAndAnswers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadQuestions = async () => {
            const result = await FetchRecentQuestionsAndAnswers();
            if (result.data) {
                setQuestionsAndAnswers(result.data);
            }
            setLoading(false);
        };
        loadQuestions();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', maxWidth: '800px', margin: '0 auto', paddingBottom: '64px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}>
                <h3 className="text-sm font-extrabold text-[var(--text-secondary)] uppercase tracking-widest">Recent Community Questions</h3>
                <div className="h-1 w-12 bg-[var(--accent)] rounded-full"></div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '64px' }}>
                    <span className="spinner spinner-light" style={{ width: '24px', height: '24px' }}></span>
                </div>
            ) : questionsAndAnswers.length === 0 ? (
                <div className="card p-12 text-center border-dashed" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <div className="text-4xl">🤔</div>
                    <p className="text-[var(--text-muted)] font-medium">No recent questions asked yet. Be the first!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {questionsAndAnswers.map((val: any, idx: number) => (
                        <div key={idx} className="card p-8 border border-[var(--border)] bg-[rgba(17,17,19,0.6)] backdrop-blur-md rounded-2xl hover:border-[rgba(245,158,11,0.25)] transition-all duration-300" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {/* Question Section */}
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div className="h-10 w-10 shrink-0 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[var(--border)] text-[var(--text-secondary)] font-black text-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    Q
                                </div>
                                <div style={{ paddingTop: '8px' }}>
                                    <p className="text-base font-bold text-[var(--text-primary)] leading-snug">{val.userQuestion}</p>
                                </div>
                            </div>
                            
                            {/* Separator */}
                            <div className="w-full h-px bg-[var(--border)]" />

                            {/* Answer Section */}
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div className="h-10 w-10 shrink-0 rounded-xl bg-[var(--accent)] text-black font-black text-xs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(245,158,11,0.2)' }}>
                                    AI
                                </div>
                                <div style={{ paddingTop: '6px', width: '100%', overflow: 'hidden' }}>
                                    <div className="text-[15px] text-[var(--text-secondary)] leading-relaxed prose-content">
                                        <ReactMarkdown>{val.aiResponse}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}