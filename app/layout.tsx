import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import VantaDots from "./components/VantaDots";

export const metadata: Metadata = {
  title: "Eduardo Neto — Front-End Engineer",
  description: "Portfolio as Demo. Case studies, blog, and contact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#222222] text-white antialiased flex flex-col" suppressHydrationWarning>
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#222222]/90 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold text-[#ff8820]">
              Eduardo Neto
            </Link>
            <ul className="flex items-center gap-6 text-sm text-zinc-300">
              <li><Link href="/case-studies" className="hover:text-white">Case Studies</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </nav>
        </header>
        <VantaDots />
        <main className="relative z-10 mx-auto max-w-6xl px-6 flex-1">
          { children }
        </main>
        <footer className="relative z-10 mt-24 border-t border-white/10 py-8">
          <div className="mx-auto max-w-6xl px-6 text-sm text-zinc-400 flex items-center justify-between">
            <span>© { new Date().getFullYear() } Eduardo Neto</span>
            <div className="flex items-center gap-4">
              <a className="hover:text-white" href="https://github.com/Eduardo-YGIAH/Eduardo-Neto-2025-26" target="_blank" rel="noreferrer">GitHub</a>
              <a className="hover:text-white" href="https://www.linkedin.com/in/eduardo-neto-b71bb36b" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
