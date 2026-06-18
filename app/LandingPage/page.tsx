import Link from "next/link";
import GetUserToken from "../getUserToken";

export default async function LandingPage() {
  const userResult = await GetUserToken();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingBottom: '120px' }}>
      
      {/* ── HERO SECTION ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '32px', marginTop: '60px', maxWidth: '900px' }}>
        
        <div className="badge badge-accent" style={{ padding: '8px 16px', fontSize: '11px', border: '1px solid rgba(245,158,11,0.3)' }}>
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse inline-block mr-2" />
          GEMINI AI ENGINE CONNECTED
        </div>
        
        <h1 className="gradient-text" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.04em' }}>
          Create, Analyze & Chat <br/> With Your Blogs Instantly
        </h1>
        
        <p className="text-[var(--text-secondary)]" style={{ fontSize: '18px', lineHeight: 1.6, maxWidth: '750px' }}>
          Unlock next-generation AI-powered blog writing, deep content analysis, and active 
          <strong className="text-[var(--text-primary)] font-bold"> Retrieval-Augmented Generation (RAG)</strong>. 
          Built on a highly composable MCP server architecture.
        </p>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '16px' }}>
          <Link href={userResult ? "/CreateBlogByMCP" : "/LoginPage"} className="btn-primary" style={{ padding: '16px 32px', fontSize: '16px', borderRadius: '999px', boxShadow: '0 0 30px rgba(245,158,11,0.2)' }}>
            Write with AI <span style={{ marginLeft: '8px' }}>✨</span>
          </Link>
          <Link href="/AllBlogsPage" className="btn-ghost text-[var(--text-primary)]" style={{ padding: '16px 32px', fontSize: '16px', borderRadius: '999px', border: '1px solid transparent', fontWeight: 700 }}>
            Explore Archive
          </Link>
        </div>
      </div>

      {/* ── APP UI MOCKUP ── */}
      <div className="w-full mt-24 relative" style={{ maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-[var(--accent)] blur-[120px] opacity-10 pointer-events-none rounded-full" />
        
        <div className="w-full rounded-[24px] border border-[var(--border)] bg-[#0A0A0A] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden relative z-10" style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Mac window header */}
          <div className="h-10 border-b border-[var(--border)] bg-[#111] w-full px-4" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <div className="ml-4 text-[11px] font-mono text-[var(--text-muted)] tracking-widest">studio.blogai.local</div>
          </div>
          {/* Window Body */}
          <div className="w-full h-[400px]" style={{ display: 'flex' }}>
            {/* Sidebar */}
            <div className="w-[200px] border-r border-[var(--border)] bg-[#0C0C0D] p-4 hidden md:block" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mb-2">Workspace</div>
              {['Dashboard', 'Explore Blogs', 'AI Writing Studio', 'Deep Analysis'].map((item, i) => (
                <div key={i} className={`text-xs font-semibold px-3 py-2 rounded-lg ${i === 0 ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
                  {item}
                </div>
              ))}
            </div>
            {/* Editor */}
            <div className="flex-1 border-r border-[var(--border)] bg-[#0A0A0A] p-8" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-widest" style={{ display: 'flex', justifyContent: 'space-between' }}>
                 <span>Draft · Live Editor</span>
                 <span>452 words</span>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                 <h2 className="text-2xl font-bold text-white">The Power of Vector Retrieval in AI Applications</h2>
                 <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                   Retrieval-Augmented Generation (RAG) is transforming how users interact with enterprise data. By splitting documents into optimized semantic chunks and storing them in MongoDB Atlas, we can fetch high-relevance matches.
                 </p>
               </div>
               <div className="p-4 rounded-xl border border-[var(--accent-soft)] bg-[var(--accent-glow)]/10">
                 <div className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   ✦ AI Text Refinement
                 </div>
                 <p className="text-sm text-[var(--text-primary)] italic border-l-2 border-[var(--accent)] pl-3">
                   "Using dynamic vector indexes ensures your application minimizes token usage while dramatically increasing answer precision."
                 </p>
               </div>
            </div>
            {/* Chat */}
            <div className="w-[280px] bg-[#111113] hidden lg:flex flex-col border-l border-[var(--border)]">
              <div className="h-14 border-b border-[var(--border)] px-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="h-6 w-6 rounded bg-[var(--accent)] text-black text-[9px] font-black" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>RAG</div>
                  <div>
                    <div className="text-xs font-bold text-white leading-none">Interactive AI RAG Agent</div>
                    <div className="text-[9px] text-[var(--success)] mt-1" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]"></span> Ready to answer</div>
                  </div>
                </div>
              </div>
              <div className="p-4 overflow-hidden relative" style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                   <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest text-right">USER</div>
                   <div className="bg-[var(--bg-surface)] border border-[var(--border)] text-sm text-[var(--text-secondary)] p-3 rounded-xl rounded-tr-sm">
                     What is the primary benefit of deploying an MCP model context server here?
                   </div>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                   <div className="text-[9px] text-[var(--accent)] font-bold uppercase tracking-widest" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>✦ Blog Studio AI</div>
                   <div className="text-sm text-white p-3 leading-relaxed">
                     By querying your MongoDB vector index, I can retrieve your specific blog content as high-precision context, eliminating hallucination and providing accurate insights instantly!
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES GRID ── */}
      <div className="w-full mt-32" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '64px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
          <span className="badge badge-accent" style={{ border: 'none', background: 'transparent', color: 'var(--accent)', fontWeight: 900 }}>FEATURES GRID</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">Supercharged Writing Capabilities</h2>
          <p className="text-[var(--text-secondary)] max-w-[500px] text-lg">A comprehensive suite of intelligence tools designed specifically to streamline your content creation loop.</p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6" style={{ maxWidth: '1000px' }}>
          {[
            { title: "AI Context Generation", desc: "Draft professional-grade content instantly using Gemini's highly responsive system instructions.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
            { title: "Active Blog Analytics", desc: "Gain immediate content insights, clarity scoring, and actionable recommendations directly on the canvas.", icon: "M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" },
            { title: "Real-time AI Rewrite", desc: "Refine tone, enhance conciseness, or build SEO headings with an adaptive AI editor sidebar overlay.", icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" }
          ].map((feature, i) => (
            <div key={i} className="card p-8 border border-[var(--border)] bg-[#0C0C0D] hover:border-[var(--border-active)] transition-all rounded-[20px]" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="h-12 w-12 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--accent)]" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Wide RAG Card */}
        <div className="w-full card border border-[var(--border-active)] bg-gradient-to-br from-[var(--bg-surface)] to-[#0A0A0A] rounded-[24px] overflow-hidden" style={{ maxWidth: '1000px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
           <div className="w-full md:w-1/2 p-12" style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center', alignItems: 'flex-start' }}>
             <span className="badge badge-accent">ACTIVE RETRIEVAL Q&A</span>
             <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight">Talk Directly with Your Knowledge Base</h2>
             <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed">
               Retrieve contextual information dynamically from all your previously written articles. Ask questions, compare opinions, and synthesize new ideas with full RAG active pipelines.
             </p>
             <div className="mt-2">
               <Link href="/AskBlogQuestionPage" className="btn-primary rounded-xl" style={{ padding: '14px 28px' }}>Try Live QA Agent →</Link>
             </div>
           </div>
           <div className="w-full md:w-1/2 bg-[#0A0A0A] border-l border-[var(--border)] p-10 font-mono text-[13px] leading-relaxed" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="text-[10px] text-[var(--text-muted)] mb-4 flex items-center gap-2 uppercase tracking-widest">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse inline-block" /> RAG Query Simulator
              </div>
              <div className="text-[var(--accent)] font-bold mb-1">&gt; FetchContext("vector database stability")</div>
              <div className="text-[var(--text-muted)] mb-3">// Retrieving chunks matching emailId...</div>
              <div className="text-[var(--success)] font-bold mb-3">✓ Found 3 highly relevant paragraphs in "Stabilizing RAG Pipelines"</div>
              <div className="border-l-2 border-[var(--border-active)] pl-3 text-[var(--text-secondary)] italic">
                "Vector dimension configuration resolved mismatch between Atlas and Google Embedding models."
              </div>
           </div>
        </div>
      </div>

      {/* ── STATS FOOTER ── */}
      <div className="w-full mt-32 border-t border-[var(--border)] pt-16" style={{ maxWidth: '1000px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, textAlign: 'center' }}>
           <div className="text-[var(--accent)] mb-2"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div>
           <h3 className="text-2xl font-black text-white">0ms Latency</h3>
           <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold mt-1">Semantic Search</p>
         </div>
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, textAlign: 'center' }}>
           <div className="text-[var(--accent)] mb-2"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11 4L7 14h4v6l4-10h-4z"/></svg></div>
           <h3 className="text-2xl font-black text-white">Gemini 2.5</h3>
           <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold mt-1">Advanced LLM Model</p>
         </div>
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, textAlign: 'center' }}>
           <div className="text-[var(--accent)] mb-2"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M5 13l4 4L19 7"/></svg></div>
           <h3 className="text-2xl font-black text-white">100% Vectorized</h3>
           <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold mt-1">MongoDB Atlas RAG</p>
         </div>
      </div>
      
    </div>
  );
}
