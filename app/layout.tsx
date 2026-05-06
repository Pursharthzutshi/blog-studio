import type { Metadata } from "next";
import "./main.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Blog Studio | Intelligent Content Creation",
  description: "Next-generation AI-powered blog writing, analysis, and optimization platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Subtle page glow */}
        <div className="page-glow" />

        {/* ── Navbar ── */}
        <header className="sticky top-0 z-50 w-full border-b border-[var(--border)]" style={{ background: 'rgba(10, 10, 11, 0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
          <nav className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-[var(--accent)] group-hover:scale-105 transition-transform duration-200">
                <span className="text-black font-black text-xs">AI</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
                Blog<span className="text-[var(--accent)]">Studio</span>
              </span>
            </Link>

            <div className="hidden md:flex gap-1 items-center">
              <Link href="/AllBlogsPage" className="nav-link">Explore</Link>
              <Link href="/CreateBlogByMCP" className="nav-link">AI Studio</Link>
              <Link href="/AnalyzeBlog" className="nav-link">Analysis</Link>
              <Link href="/AddNewBlogPage" className="nav-link">Write</Link>
              <Link href="/AskBlogQuestionPage" className="nav-link">Ask Blog Question from AI</Link>

              <div className="h-4 w-px bg-[var(--border)] mx-3" />

              <Link href="/LoginPage" className="nav-link">Login</Link>
              <Link href="/CreateNewAccount" className="btn-primary py-2 px-5 text-xs font-bold rounded-lg">
                Sign Up
              </Link>
            </div>
          </nav>
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
