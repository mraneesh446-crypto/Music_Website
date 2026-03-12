"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="fixed w-full z-50 glass py-4 px-8 border-b border-white/10 flex justify-between items-center transition-all duration-300">
            <Link href="/" className="text-2xl font-black tracking-tighter">
                ANISHXNJ <span className="text-gradient">Plays</span>
            </Link>
            <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
                <Link
                    href="/"
                    className={`hover:text-white transition-colors ${pathname === "/" ? "text-primary font-bold" : ""}`}
                >
                    Home
                </Link>
                <Link
                    href="/about"
                    className={`hover:text-white transition-colors ${pathname === "/about" ? "text-primary font-bold" : ""}`}
                >
                    About Us
                </Link>
                <Link
                    href="/portfolio"
                    className={`hover:text-white transition-colors ${pathname === "/portfolio" ? "text-primary font-bold" : ""}`}
                >
                    Portfolio
                </Link>
                <Link
                    href="/blog"
                    className={`hover:text-white transition-colors ${pathname.startsWith("/blog") ? "text-primary font-bold" : ""}`}
                >
                    Blog
                </Link>
                <Link
                    href="/learn"
                    className={`hover:text-white transition-colors ${pathname === "/learn" ? "text-primary font-bold" : ""}`}
                >
                    Learn From Us
                </Link>
                <Link
                    href="/transactions"
                    className={`hover:text-white transition-colors ${pathname === "/transactions" ? "text-primary font-bold" : ""}`}
                >
                    Transactions
                </Link>
            </div>
            <Link
                href="/sign-in"
                className="px-6 py-2 rounded-full bg-primary hover:bg-primary-dark text-white font-medium transition-colors shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            >
                Sign In
            </Link>
        </nav>
    );
}
