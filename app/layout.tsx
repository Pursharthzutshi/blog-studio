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
        <header className="sticky top-0 z-50 w-full" style={{ background: 'rgba(10, 10, 11, 0.75)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <nav className="container" style={{ height: '72px', padding: '0 2.5rem', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group shrink-0" style={{ textDecoration: 'none' }}>
                <div style={{
                  height: '36px', width: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '10px', background: 'var(--accent)',
                  boxShadow: '0 0 20px rgba(245,158,11,0.35)',
                  transition: 'all 0.25s ease',
                }} className="group-hover:scale-110">
                  <span style={{ color: '#000', fontWeight: 900, fontSize: '11px', letterSpacing: '-0.5px' }}>AI</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
                    Blog<span style={{ color: 'var(--accent)' }}>Studio</span>
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em', marginTop: '2px' }}>AI-Powered Writing</span>
                </div>
              </Link>

              {/* Center Pill Nav */}
              <div className="hidden md:flex items-center" style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '9999px',
                padding: '6px 8px',
                gap: '4px',
              }}>
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
                    className="nav-pill-item"
                    style={{ textDecoration: 'none' }}
                  >
                    <svg style={{ height: '14px', width: '14px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Auth Section */}
              <div className="hidden md:flex items-center shrink-0" style={{ gap: '10px', justifySelf: 'end' }}>
                {userResult ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* User Chip */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '9999px',
                      padding: '6px 14px 6px 8px',
                    }}>
                      <div style={{
                        height: '26px', width: '26px', borderRadius: '9999px',
                        background: 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(245,158,11,0.1))',
                        border: '1px solid rgba(245,158,11,0.35)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase' }}>
                          {emailId?.charAt(0) ?? "U"}
                        </span>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', maxWidth: '130px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {emailId}
                      </span>
                    </div>
                    <LogoutPage />
                  </div>
                ) : (
                  <>
                    <Link href="/LoginPage" className="nav-login-link">
                      Log in
                    </Link>
                    <Link href="/CreateNewAccount" className="btn-primary" style={{
                      padding: '8px 20px', borderRadius: '9999px',
                      fontSize: '13px', fontWeight: 700,
                      boxShadow: '0 4px 16px rgba(245,158,11,0.2)',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      textDecoration: 'none',
                    }}>
                      <svg style={{ height: '12px', width: '12px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
