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
        <div style={{ paddingTop: '64px', paddingBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '64px', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', width: '100%' }}>
                <div className="h-16 w-16 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--accent)] mb-2 shadow-[0_0_30px_rgba(245,158,11,0.15)]" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Ask AI Agent</h1>
                <p className="text-[var(--text-muted)] text-base max-w-[500px]">
                    Query your vectorized knowledge base. Our AI has ingested all your workspace blogs and is ready to answer questions.
                </p>
            </div>

            <div className="card w-full" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <input 
                            placeholder="Ask a question about your blogs..." 
                            name="userQuestion" 
                            type="text" 
                            required
                            style={{ 
                                width: '100%', 
                                padding: '16px 20px 16px 52px', 
                                fontSize: '16px',
                                borderRadius: '12px',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--bg-elevated)',
                                color: 'var(--text-primary)',
                                outline: 'none',
                                transition: 'all 0.2s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isPending}
                        className="btn-primary"
                        style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                    >
                        {isPending ? (
                            <>
                                <span className="spinner spinner-light" style={{ width: '18px', height: '18px', borderWidth: '2px' }} />
                                Searching Knowledge Base...
                            </>
                        ) : (
                            <>Ask Question</>
                        )}
                    </button>
                </form>

                {state?.message && !isPending && (
                    <div style={{ padding: '20px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div className="h-6 w-6 rounded bg-[var(--accent)] text-black font-black text-[10px]" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AI</div>
                            <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest">Response</span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                            {state.message}
                        </p>
                    </div>
                )}
            </div>

            <div style={{ width: '100%' }}>
                <FetchQuestionsAndAnswers />
            </div>
        </div>
    )
}