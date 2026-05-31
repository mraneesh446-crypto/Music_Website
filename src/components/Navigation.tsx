"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navigation() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me");
                if (res.ok) {
                    const data = await res.json();
                    if (data.authenticated) {
                        setUser(data.user);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch user");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [pathname]);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            setUser(null);
            setShowDropdown(false);
            router.push("/sign-in");
        } catch (err) {
            console.error("Failed to logout");
        }
    };

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
            
            <div className="relative">
                {!loading && (
                    user ? (
                        <div>
                            <button 
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs uppercase">
                                    {user.fullName ? user.fullName.charAt(0) : '?'}
                                </div>
                                <span className="text-sm font-medium text-white hidden md:block">
                                    {user.fullName?.split(' ')[0] || "User"}
                                </span>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#1a1a24] border border-white/10 rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="px-4 py-2 border-b border-white/5 mb-2">
                                        <p className="text-sm font-medium text-white truncate">{user.fullName}</p>
                                        <p className="text-xs text-gray-400 truncate">{user.email || user.phone}</p>
                                    </div>
                                    <Link 
                                        href="/profile" 
                                        onClick={() => setShowDropdown(false)}
                                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        My Profile
                                    </Link>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/sign-in"
                            className="px-6 py-2 rounded-full bg-primary hover:bg-primary-dark text-white font-medium transition-colors shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                        >
                            Sign In
                        </Link>
                    )
                )}
            </div>
        </nav>
    );
}
