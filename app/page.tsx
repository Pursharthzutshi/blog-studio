import Link from "next/link";

export default function Home() {
  return (
    <div className="relative isolate min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
      {/* Background Effects */}
      <div className="glow-bg">
        <div className="glow-point" style={{ top: '10%', left: '10%' }} />
        <div className="glow-point" style={{ bottom: '10%', right: '10%', animationDelay: '-5s' }} />
      </div>
      <div className="fixed inset-0 grid-pattern -z-10 opacity-20" />

      {/* Hero Content */}
      <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
        <div className="hero-tag">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          Next-Gen AI Content Infrastructure
        </div>

        <h1 className="gradient-text pb-6 tracking-tighter leading-[0.95]">
          The Future of Blog <br className="hidden md:block" /> Engineering is Here.
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Create, analyze, and optimize your content at scale with our integrated 
          <span className="text-white font-medium"> Gemini AI ecosystem </span> 
          and MCP server intelligence.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
          <Link href="/CreateBlogByMCP" className="btn px-12 py-5 text-sm uppercase tracking-widest font-black shadow-[0_20px_50px_rgba(99,102,241,0.3)] hover:scale-105 transition-all">
            Enter AI Studio
          </Link>
          <Link href="/AnalyzeBlog" className="px-12 py-5 text-sm uppercase tracking-widest font-black rounded-2xl glass-card border-white/10 hover:bg-white/10 transition-all hover:scale-105">
            Deep Analysis
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-32">
          {[
            { title: "AI Generation", desc: "Craft professional blog posts in seconds with advanced Google Gemini reasoning.", icon: "⚡" },
            { title: "Deep Analysis", desc: "Gain critical insights and tone feedback on existing content automatically.", icon: "🧠" },
            { title: "Real-time MCP", desc: "Hyper-fast communication with our dedicated Model Context Protocol server.", icon: "🌉" }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-10 text-left space-y-4 group hover:border-purple-500/40 transition-all duration-500">
              <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-purple-500/10 transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors uppercase tracking-tight">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500 group-hover:text-gray-400 transition-colors">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
