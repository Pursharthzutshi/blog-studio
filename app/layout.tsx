import type { Metadata } from "next";
import "./main.css";
import Link from "next/link";
import GetUserToken from "./getUserToken";
import LogoutPage from "./LogoutPage/page";

export const metadata: Metadata = {
  title: "AI Blog Studio | Intelligent Content Creation",
  description: "Next-generation AI-powered blog writing, analysis, and optimization platform.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const userResult = await GetUserToken()
  const emailId = userResult?.emailId
  console.log(userResult)

  return (
    <html lang="en">
      <body>
        {/* Subtle page glow */}
        <div className="page-glow" />

        {/* ── Navbar ── */}
        <header className="sticky top-0 z-50 w-full" style={{ background: 'rgba(10, 10, 11, 0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
          <div className="border-b border-[var(--border)]">
            <nav className="container flex h-16 items-center justify-between gap-4">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-[var(--accent)] shadow-lg shadow-amber-500/20 group-hover:scale-110 group-hover:shadow-amber-500/30 transition-all duration-200">
                  <span className="text-black font-black text-[11px] tracking-tight">AI</span>
                </div>
                <span className="text-base font-bold tracking-tight text-[var(--text-primary)]">
                  Blog<span className="text-[var(--accent)]">Studio</span>
                </span>
              </Link>

              {/* Center Pill Nav */}
              <div className="hidden md:flex items-center gap-0.5 bg-[rgba(255,255,255,0.03)] border border-[var(--border)] rounded-full px-1.5 py-1.5">
                {[
                  { href: "/AllBlogsPage", label: "Explore", icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" },
                  { href: "/CreateBlogByMCP", label: "AI Studio", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                  { href: "/AnalyzeBlog", label: "Analysis", icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0V6.75A2.25 2.25 0 0110.5 4.5h3a2.25 2.25 0 012.25 2.25v9.75M9 19.5h6" },
                  { href: "/AddNewBlogPage", label: "Write", icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" },
                  { href: "/AskBlogQuestionPage", label: "Ask AI", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200 group"
                  >
                    <svg className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Auth Section */}
              <div className="hidden md:flex items-center gap-2 shrink-0">
                {userResult ? (
                  <div className="flex items-center gap-3">
                    {/* User Chip */}
                    <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.04)] border border-[var(--border)] rounded-full px-3 py-1.5">
                      <div className="h-5 w-5 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-amber-400 uppercase">
                          {emailId?.charAt(0) ?? "U"}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-[var(--text-secondary)] max-w-[120px] truncate">
                        {emailId}
                      </span>
                    </div>
                    <LogoutPage />
                  </div>
                ) : (
                  <>
                    <Link href="/LoginPage" className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] px-3 py-1.5 rounded-full hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200">
                      Login
                    </Link>
                    <Link href="/CreateNewAccount" className="btn-primary py-2 px-4 text-xs font-bold rounded-full shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all flex items-center gap-1.5">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

            </nav>
          </div>
        </header>


        {/* ── Main ── */}
        <main className="min-h-[calc(100vh-64px)] py-12">
          <div className="container w-full">
            {children}
          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="border-t border-[var(--border)] py-10 text-center">
          <div className="container">
            <div className="flex justify-center gap-6 mb-4">
              <Link href="/" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">Privacy</Link>
              <Link href="/" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">Terms</Link>
              <Link href="/" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">Support</Link>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] tracking-wide">
              © 2026 BlogStudio · Built with AI
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
