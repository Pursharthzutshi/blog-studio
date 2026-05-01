import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center pt-16 md:pt-24 pb-12">
      {/* ── Hero ── */}
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="badge badge-accent mx-auto">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" />
          </span>
          AI-Powered Platform
        </div>

        <h1 className="gradient-text pb-2">
          Create better content,<br className="hidden sm:block" /> faster than ever.
        </h1>

        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          Write, analyze, and refine your blogs with an integrated{" "}
          <span className="text-[var(--text-primary)] font-medium">Gemini AI</span>{" "}
          engine and MCP architecture.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/CreateBlogByMCP"
            className="btn-primary py-3.5 px-10 text-sm font-bold rounded-xl"
          >
            Start Writing →
          </Link>
          <Link
            href="/AllBlogsPage"
            className="btn-ghost py-3.5 px-10 text-sm rounded-xl"
          >
            Explore Blogs
          </Link>
        </div>
      </div>

      {/* ── Feature Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-28 w-full max-w-5xl mx-auto">
        {[
          {
            title: "AI Generation",
            desc: "Craft professional blog posts in seconds with Google Gemini's advanced reasoning.",
            icon: "⚡",
          },
          {
            title: "Deep Analysis",
            desc: "Get critical insights, tone feedback, and improvement suggestions automatically.",
            icon: "📊",
          },
          {
            title: "Smart Rewrite",
            desc: "Highlight any text and let AI refine it — make it professional, concise, or SEO-ready.",
            icon: "✦",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="card p-8 space-y-4 group hover:border-[var(--border-active)] transition-all duration-300"
          >
            <div className="h-11 w-11 rounded-xl bg-[var(--accent-soft)] border border-[rgba(245,158,11,0.15)] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed group-hover:text-[var(--text-secondary)] transition-colors">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── Stats Row ── */}
      <div className="flex items-center justify-center gap-12 mt-20 text-center">
        {[
          { value: "AI", label: "Powered by Gemini" },
          { value: "MCP", label: "Server Protocol" },
          { value: "∞", label: "Possibilities" },
        ].map((stat, i) => (
          <div key={i} className="space-y-1">
            <div className="text-2xl font-black text-[var(--accent)]">{stat.value}</div>
            <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
