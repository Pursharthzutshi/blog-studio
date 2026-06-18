import Link from "next/link";
import GetUserToken from "../getUserToken";
import { FetchBlogFromDB } from "../lib/dal/blog";

export default async function Home() {
  const userResult = await GetUserToken();
  const blogs = await FetchBlogFromDB();
  const emailId = userResult?.emailId;

  return (
    <div className="w-full max-w-6xl pb-16" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
      {/* ── Dashboard Header ── */}
      <div className="w-full border-b border-[var(--border)] pb-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">System Online</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
            Welcome back{emailId ? `, ${emailId.split('@')[0]}` : ''}
          </h1>
          <p className="text-sm md:text-base text-[var(--text-secondary)]">
            Here's an overview of your AI Blog Studio and recent activities.
          </p>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <Link href="/CreateBlogByMCP" className="btn-primary py-2.5 px-6 text-sm rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20">
            Write New Blog
          </Link>
        </div>
      </div>

      {/* ── Quick Stats Grid ── */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Blogs", value: blogs.length.toString(), icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
          { label: "AI Generations", value: "Active", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
          { label: "Vector Index", value: "Synced", icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.018-.378.031-.582.05m-16.5 0c.204.019.388.032.582.05m-1.332-8.056c.194-.018.378-.031.582-.05M5.25 8.706v4.25c0 1.081.768 2.015 1.837 2.175.641.096 1.296.175 1.96.236m0 0V21M16.5 15.132v5.868", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
          { label: "RAG Readiness", value: "100%", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" }
        ].map((stat, i) => (
          <div key={i} className="card p-6 border border-[var(--border)] bg-[rgba(17,17,19,0.4)] backdrop-blur-md rounded-2xl hover:border-[rgba(245,158,11,0.25)] transition-all duration-300" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '16px' }}>
            <div className={`h-12 w-12 rounded-xl border ${stat.bg} ${stat.border} ${stat.color}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <div className="text-[10px] text-[var(--text-muted)] font-extrabold uppercase tracking-widest">{stat.label}</div>
              <div className="text-2xl font-black text-[var(--text-primary)]">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Quick Actions ── */}
        <div className="lg:col-span-1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <h2 className="text-xs font-extrabold text-[var(--text-secondary)] uppercase tracking-widest px-1 text-center">Quick Actions</h2>
          <div className="w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            {[
              { title: "Write with AI Studio", desc: "Use Gemini and MCP to generate content", href: "/CreateBlogByMCP", icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" },
              { title: "Analyze a Blog", desc: "Get AI clarity & SEO scores", href: "/AnalyzeBlog", icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0V6.75A2.25 2.25 0 0110.5 4.5h3a2.25 2.25 0 012.25 2.25v9.75M9 19.5h6" },
              { title: "Ask AI Agent", desc: "Query your vectorized knowledge base", href: "/AskBlogQuestionPage", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
            ].map((action, i) => (
              <Link href={action.href} key={i} className="block card hover:border-[var(--accent)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)] group transition-all rounded-2xl bg-[var(--bg-elevated)] w-full text-center" style={{ textDecoration: 'none', padding: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                  <div className="h-14 w-14 rounded-2xl bg-[var(--bg-surface)] text-[var(--text-muted)] group-hover:text-black group-hover:bg-[var(--accent)] transition-all border border-[var(--border)] shrink-0 shadow-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="text-base font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-tight mb-2">{action.title}</div>
                    <div className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{action.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Recent Blogs ── */}
        <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div className="w-full px-1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <h2 className="text-xs font-extrabold text-[var(--text-secondary)] uppercase tracking-widest text-center">Recent Workspace Blogs</h2>
            <Link href="/AllBlogsPage" className="text-[11px] font-bold text-[var(--accent)] hover:text-[var(--accent-hover)] tracking-wider uppercase transition-colors text-center">
              View All →
            </Link>
          </div>
          <div className="w-full card border border-[var(--border)] bg-[rgba(17,17,19,0.4)] backdrop-blur-md overflow-hidden rounded-2xl">
            {blogs.length === 0 ? (
               <div className="py-20 text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                 <div className="h-16 w-16 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-muted)] mb-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                   </svg>
                 </div>
                 <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">No blogs created yet</h3>
                 <p className="text-[15px] text-[var(--text-secondary)] max-w-[320px] leading-relaxed">Your workspace is empty. Create your first AI-generated blog to get started.</p>
               </div>
            ) : (
               <div className="divide-y divide-[var(--border)]">
                 {blogs.slice(0, 5).map((blog: any, i: number) => (
                    <div key={i} className="hover:bg-[var(--bg-hover)] transition-colors group text-center" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '100%' }}>
                        <Link href={`/blog/${blog._id}`} className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] truncate block transition-colors mb-2" style={{ textDecoration: 'none', maxWidth: '100%' }}>
                          {blog.title}
                        </Link>
                        <div className="text-xs text-[var(--text-muted)] font-medium tracking-wide" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div className="h-5 w-5 rounded-full bg-amber-500/20 text-amber-500 text-[9px] font-black uppercase" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {blog.authorId?.charAt(0) || "U"}
                            </div>
                            {blog.authorId || "Unknown Author"}
                          </span>
                          <span className="text-[var(--border-active)]">—</span>
                          <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                      <div>
                        <Link href={`/blog/${blog._id}`} className="btn-primary px-6 py-2.5 text-[13px] rounded-xl font-bold shadow-md shadow-amber-500/10 hover:shadow-amber-500/20">
                          View Blog
                        </Link>
                      </div>
                    </div>
                 ))}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


