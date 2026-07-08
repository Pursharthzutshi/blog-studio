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

        <div className="flex h-screen overflow-hidden">
          {/* ── Sidebar ── */}
          <aside className="w-[72px] border-r border-[var(--border)] bg-[rgba(10,10,11,0.95)] backdrop-blur-2xl shrink-0 transition-all" style={{ zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Logo */}
              <div className="h-20 w-full border-b border-[rgba(255,255,255,0.07)]" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link href="/DashboardPage" className="group" style={{ textDecoration: 'none' }}>
                  <div className="h-10 w-10 rounded-xl bg-[var(--accent)] shadow-[0_0_20px_rgba(245,158,11,0.35)] group-hover:scale-110 transition-all" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="text-[#000] font-black text-xs">AI</span>
                  </div>
                </Link>
              </div>

              {/* Navigation Links */}
              <nav className="py-6 w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                {[
                  { href: "/AllBlogsPage", label: "Explore", icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" },
                  { href: "/CreateBlogByMCP", label: "AI Studio", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                  { href: "/AddNewBlogPage", label: "Write", icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" },
                  { href: "/AskBlogQuestionPage", label: "Ask AI", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
                ].map((item) => (
                  <div key={item.href} className="relative group w-full" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link
                      href={item.href}
                      className="h-11 w-11 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
                      style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <svg className="h-5 w-5 opacity-80 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </Link>
                    {/* Tooltip */}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[rgba(17,17,19,0.95)] backdrop-blur-md border border-[var(--border)] rounded-lg text-xs font-bold text-[var(--text-primary)] shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 translate-x-1 group-hover:translate-x-0">
                      {item.label}
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            {/* Auth Section */}
            <div className="w-full py-6 border-t border-[rgba(255,255,255,0.07)]" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              {userResult ? (
                <>
                  <div className="relative group w-full" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-500/10 border border-amber-500/35 cursor-pointer hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-shadow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="text-sm font-bold text-amber-500 uppercase">
                        {emailId?.charAt(0) ?? "U"}
                      </span>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[rgba(17,17,19,0.95)] backdrop-blur-md border border-[var(--border)] rounded-lg text-xs font-bold text-[var(--text-primary)] shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 translate-x-1 group-hover:translate-x-0">
                      {emailId}
                    </div>
                  </div>
                  <div className="relative group w-full" style={{ display: 'flex', justifyContent: 'center' }}>
                    <LogoutPage />
                    {/* Tooltip */}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[rgba(17,17,19,0.95)] backdrop-blur-md border border-[var(--border)] rounded-lg text-xs font-bold text-red-400 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 translate-x-1 group-hover:translate-x-0">
                      Logout
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div className="relative group w-full" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link href="/LoginPage" className="h-10 w-10 rounded-xl bg-[rgba(255,255,255,0.05)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
                    </Link>
                    {/* Tooltip */}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[rgba(17,17,19,0.95)] backdrop-blur-md border border-[var(--border)] rounded-lg text-xs font-bold text-[var(--text-primary)] shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 translate-x-1 group-hover:translate-x-0">
                      Log in
                    </div>
                  </div>
                  <div className="relative group w-full" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link href="/CreateNewAccount" className="h-10 w-10 rounded-xl bg-[var(--accent)] text-[#000] shadow-[0_4px_16px_rgba(245,158,11,0.2)] hover:scale-105 transition-all" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    </Link>
                    {/* Tooltip */}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[rgba(17,17,19,0.95)] backdrop-blur-md border border-[var(--border)] rounded-lg text-xs font-bold text-[var(--text-primary)] shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 translate-x-1 group-hover:translate-x-0">
                      Sign Up
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* ── Main Content Area ── */}
          <div className="flex-1 overflow-y-auto relative bg-[var(--bg)]" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <main className="min-h-full py-10 md:py-16 w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="px-8 md:px-12 w-full" style={{ maxWidth: '1152px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {children}
              </div>
            </main>


          </div>
        </div>
      </body>
    </html>
  );
}
