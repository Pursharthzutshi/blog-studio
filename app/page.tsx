import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center pt-8 md:pt-16 pb-20 overflow-hidden">
      
      {/* ── Background Glow Spheres ── */}
      <div className="absolute top-[-100px] left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[rgba(245,158,11,0.08)] to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[200px] right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-[rgba(245,158,11,0.05)] to-transparent blur-[100px] pointer-events-none -z-10" />

      {/* ── Hero Section ── */}
      <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
        <div className="badge badge-accent mx-auto flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-xs font-bold uppercase tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          Gemini AI Engine Connected
        </div>

        <h1 className="gradient-text pb-2 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
          Create, Analyze & Chat <br className="hidden sm:block" />
          With Your Blogs Instantly
        </h1>

        <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Unlock next-generation AI-powered blog writing, deep content analysis, and active 
          <span className="text-[var(--text-primary)] font-semibold"> Retrieval-Augmented Generation (RAG)</span>.
          Built on a highly composable MCP server architecture.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <Link
            href="/CreateBlogByMCP"
            className="btn-primary py-3.5 px-8 text-sm font-bold rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all flex items-center gap-2"
          >
            <span>Write with AI</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </Link>
          <Link
            href="/AllBlogsPage"
            className="btn-ghost py-3.5 px-8 text-sm font-bold rounded-xl transition-all"
          >
            Explore Archive
          </Link>
        </div>
      </div>

      {/* ── Visual Showcase: Premium Mockup Dashboard ── */}
      <div className="w-full max-w-5xl mx-auto mt-16 px-4 md:px-0">
        <div className="relative rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(17,17,19,0.7)] backdrop-blur-xl p-4 md:p-6 shadow-2xl shadow-black/60 overflow-hidden group">
          
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.01] to-white/0 pointer-events-none" />

          {/* Window Header */}
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-green-500/60" />
              <span className="text-xs text-[var(--text-muted)] font-mono ml-2">studio.blogai.local</span>
            </div>
            <div className="flex items-center gap-2 bg-[var(--bg-surface)] px-3 py-1 rounded-md border border-[var(--border)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-500 font-mono font-bold tracking-wider uppercase">MCP: CONNECTED</span>
            </div>
          </div>

          {/* Dashboard Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Sidebar Column (3 cols) */}
            <div className="lg:col-span-3 space-y-1.5">
              <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-2 mb-2">Workspace</div>
              {[
                { label: "Dashboard", active: true, icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
                { label: "Explore Blogs", active: false, icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" },
                { label: "AI Writing Studio", active: false, icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" },
                { label: "Deep Analysis", active: false, icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0V6.75A2.25 2.25 0 0110.5 4.5h3a2.25 2.25 0 012.25 2.25v9.75M9 19.5h6" }
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    item.active
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/10"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] border border-transparent"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span>{item.label}</span>
                </div>
              ))}

              <div className="pt-6">
                <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-2 mb-2">Model Settings</div>
                <div className="bg-[var(--bg-surface)] p-3 rounded-lg border border-[var(--border)] space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-[var(--text-secondary)]">Provider</span>
                    <span className="font-bold text-amber-500">Google Gemini</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-[var(--text-secondary)]">Model</span>
                    <span className="font-mono text-[var(--text-primary)]">gemini-2.5-flash</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-[var(--text-secondary)]">Temperature</span>
                    <span className="text-[var(--text-primary)]">0.7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Central Canvas / Editor Preview (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 flex flex-col h-full min-h-[320px] justify-between relative">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] border-b border-[var(--border)] pb-2.5 mb-3">
                    <span>Draft · Live Editor</span>
                    <span>452 words</span>
                  </div>
                  <h3 className="font-bold text-md text-[var(--text-primary)] leading-tight mb-2">
                    The Power of Vector Retrieval in AI Applications
                  </h3>
                  <div className="space-y-3 text-[11px] text-[var(--text-secondary)] leading-relaxed font-sans">
                    <p>
                      Retrieval-Augmented Generation (RAG) is transforming how users interact with enterprise data. By splitting documents into optimized semantic chunks and storing them in MongoDB Atlas, we can fetch high-relevance matches.
                    </p>
                    <p className="bg-amber-500/5 border-l-2 border-amber-500 p-2.5 rounded-r-md text-[var(--text-primary)]">
                      <span className="font-semibold text-amber-500 block mb-0.5">✦ AI Text Refinement:</span>
                      "Using dynamic vector indexes ensures your application minimizes token usage while dramatically increasing answer precision."
                    </p>
                  </div>
                </div>
                
                {/* Visual Editor Buttons */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[var(--border)]">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 text-[9px] px-2 py-0.5 rounded font-mono uppercase tracking-wider font-bold">SEO Friendly</span>
                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/10 text-[9px] px-2 py-0.5 rounded font-mono uppercase tracking-wider font-bold">Informative</span>
                  <span className="ml-auto text-[10px] text-[var(--text-muted)] hover:text-amber-400 cursor-pointer flex items-center gap-1 transition-all">
                    <span>Rewrite Block</span>
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Chat Column (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 flex flex-col justify-between h-full min-h-[320px]">
                
                {/* Chat Header */}
                <div className="flex items-center gap-2.5 border-b border-[var(--border)] pb-2.5 mb-3">
                  <div className="h-6 w-6 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <span className="text-[10px] text-amber-500 font-bold">RAG</span>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-[var(--text-primary)]">Interactive AI RAG Agent</h4>
                    <p className="text-[9px] text-emerald-400 flex items-center gap-1 font-semibold">
                      <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                      Ready to answer from archive
                    </p>
                  </div>
                </div>

                {/* Messages Body */}
                <div className="space-y-3.5 flex-1 overflow-y-auto pr-1 text-[11px]">
                  
                  {/* User Bubble */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[9px] text-[var(--text-muted)] font-semibold">
                      <span>USER</span>
                      <span>10:23 PM</span>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.03)] border border-[var(--border)] p-2.5 rounded-lg rounded-tr-none text-[var(--text-secondary)] leading-normal">
                      What is the primary benefit of deploying an MCP model context server here?
                    </div>
                  </div>

                  {/* AI Bubble */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[9px] text-amber-400 font-bold">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-1.813-5.096L2.1 14.1l5.096-1.813L9 7.187l1.813 5.096L15.9 14.1l-5.096 1.813z" />
                      </svg>
                      <span>BLOG STUDIO AI</span>
                    </div>
                    <div className="bg-amber-500/5 border border-amber-500/10 p-2.5 rounded-lg rounded-tl-none text-[var(--text-primary)] leading-normal">
                      By querying your MongoDB vector index, I can retrieve your specific blog content as high-precision context, eliminating hallucination and providing accurate insights instantly!
                    </div>
                  </div>

                </div>

                {/* Chat Input Field */}
                <div className="mt-3 pt-3 border-t border-[var(--border)] flex gap-2">
                  <div className="flex-1 bg-[rgba(10,10,11,0.4)] border border-[var(--border)] rounded-md px-2.5 py-1.5 text-[10px] text-[var(--text-muted)] flex items-center">
                    Ask a question...
                  </div>
                  <div className="h-7 w-7 rounded bg-amber-500 flex items-center justify-center cursor-pointer hover:bg-amber-600 transition-colors">
                    <svg className="h-3.5 w-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Features Grid Section ── */}
      <div className="w-full max-w-5xl mx-auto mt-32 px-4">
        <div className="text-center space-y-3 mb-16">
          <div className="badge badge-accent px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-amber-500/10">Features Grid</div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--text-primary)]">
            Supercharged Writing Capabilities
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto">
            A comprehensive suite of intelligence tools designed specifically to streamline your content creation loop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "AI Context Generation",
              desc: "Draft professional-grade content instantly using Gemini's highly responsive system instructions, custom few-shots, and adaptive layouts.",
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
              glow: "from-amber-500/10 to-transparent",
              color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
            },
            {
              title: "Active Blog Analytics",
              desc: "Gain immediate content insights, clarity scoring, sentiment diagnostics, and actionable recommendations directly on the canvas.",
              icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2",
              glow: "from-purple-500/10 to-transparent",
              color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
            },
            {
              title: "Real-time AI Rewrite",
              desc: "Refine tone, enhance conciseness, optimize readability, or build SEO headings with an adaptive AI editor sidebar overlay.",
              icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
              glow: "from-emerald-500/10 to-transparent",
              color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="relative card p-8 space-y-5 rounded-2xl border border-[var(--border)] bg-[rgba(17,17,19,0.4)] backdrop-blur-md hover:bg-[rgba(24,24,27,0.7)] hover:border-[rgba(245,158,11,0.25)] transition-all duration-300 group overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-tr ${feature.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center border ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                </svg>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-lg text-[var(--text-primary)] group-hover:text-amber-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Retrieval-Augmented Generation (RAG) Dedicated Banner ── */}
      <div className="w-full max-w-5xl mx-auto mt-32 px-4">
        <div className="relative rounded-2xl border border-amber-500/10 bg-gradient-to-r from-[rgba(245,158,11,0.06)] to-transparent p-8 md:p-12 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[rgba(245,158,11,0.04)] blur-[80px] pointer-events-none -z-10" />
          
          <div className="space-y-4 max-w-xl text-left">
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] px-2.5 py-1 rounded-full font-bold tracking-wider uppercase">Active Retrieval Q&A</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] leading-tight">
              Talk Directly with <br /> Your Knowledge Base
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Retrieve contextual information dynamically from all your previously written articles. Ask questions, compare opinions, cross-reference statistics, and synthesize new ideas with full RAG active pipelines.
            </p>
            <div className="pt-2">
              <Link
                href="/AskBlogQuestionPage"
                className="btn-primary py-3 px-6 text-xs font-bold rounded-lg shadow-lg shadow-amber-500/5 hover:shadow-amber-500/15 transition-all inline-flex items-center gap-2"
              >
                <span>Try Live QA Agent</span>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Interactive QA Graphic element */}
          <div className="w-full md:w-80 bg-[rgba(10,10,11,0.6)] border border-[var(--border)] rounded-xl p-4 space-y-3 font-mono text-[10px]">
            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2 text-[var(--text-muted)]">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span>RAG Query Simulator</span>
            </div>
            <div className="text-amber-400/90 font-semibold">&gt; FetchContext("vector database stability")</div>
            <div className="text-[var(--text-muted)] italic">// Retrieving chunks matching emailId...</div>
            <div className="text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 p-2 rounded">
              ✔ Found 3 highly relevant paragraphs in "Stabilizing RAG Pipelines"
            </div>
            <div className="text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-surface)] p-2 rounded border border-[var(--border)]">
              "Vector dimension configuration resolved mismatch between Atlas and Google Embedding models."
            </div>
          </div>
        </div>
      </div>

      {/* ── Dynamic Stats Segment ── */}
      <div className="w-full max-w-4xl mx-auto mt-28 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-[var(--border)] pt-12">
          {[
            { value: "0ms Latency", label: "Semantic Search", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
            { value: "Gemini 2.5", label: "Advanced LLM Model", icon: "M9.813 15.904L9 21l-1.813-5.096L2.1 14.1l5.096-1.813L9 7.187l1.813 5.096L15.9 14.1l-5.096 1.813z" },
            { value: "100% Vectorized", label: "MongoDB Atlas RAG", icon: "M20.893 13.393l-9 9a2.44 2.44 0 01-3.45 0l-6.75-6.75a2.44 2.44 0 010-3.45l9-9a2.44 2.44 0 013.45 0l6.75 6.75c.953.953.953 2.497 0 3.45z" },
          ].map((stat, i) => (
            <div key={i} className="space-y-2 group">
              <div className="flex justify-center">
                <div className="h-8 w-8 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform duration-300 border border-amber-500/10">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
              </div>
              <div className="text-xl font-black text-[var(--text-primary)] group-hover:text-amber-400 transition-colors">{stat.value}</div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
