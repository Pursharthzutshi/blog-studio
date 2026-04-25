import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./main.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Blog Studio | Intelligent Content Creation",
  description: "Next-generation AI-powered blog writing, analysis, and optimization platform.",
};

import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen noise-bg selection:bg-purple-500/30">
        <div className="fixed inset-0 glow-bg pointer-events-none -z-10" />

        <header className="sticky top-0 z-50 w-full bg-black/40 backdrop-blur-xl border-b border-white/5">
          <nav className="container flex h-20 items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <span className="text-white font-black text-lg">AI</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white">
                Studio<span className="text-purple-500">Blog</span>
              </span>
            </Link>

            <div className="hidden md:flex gap-2 items-center">
              <Link href="/AllBlogsPage" className="nav-link">Explore</Link>
              <Link href="/CreateBlogByMCP" className="nav-link">AI Studio</Link>
              <Link href="/AnalyzeBlog" className="nav-link">Intelligence</Link>
              <Link href="/AddNewBlogPage" className="nav-link">Manual</Link>

              <div className="h-6 w-px bg-white/10 mx-4" />

              <Link href="/LoginPage" className="nav-link text-white/70 hover:text-white">Login</Link>
              <Link href="/CreateNewAccount" className="btn py-2.5 px-8 shadow-none hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                Sign Up
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center py-12">
          <div className="container w-full">
            {children}
          </div>
        </main>

        <footer className="mt-24 border-t border-white/5 py-16 text-center text-sm text-gray-500 bg-black/20">
          <div className="container">
            <div className="mb-8 flex justify-center gap-8">
              <Link href="/" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
              <Link href="/" className="hover:text-purple-400 transition-colors">Terms of Service</Link>
              <Link href="/" className="hover:text-purple-400 transition-colors">Support</Link>
            </div>
            <p className="tracking-widest uppercase text-[10px] font-bold opacity-50">
              © 2026 AI Blog Studio • Engineering the future of content.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
