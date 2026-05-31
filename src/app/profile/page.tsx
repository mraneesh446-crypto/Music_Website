"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function UserProfile() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me");
                if (res.ok) {
                    const data = await res.json();
                    if (data.authenticated) {
                        setUser(data.user);
                    } else {
                        router.push("/sign-in");
                    }
                } else {
                    router.push("/sign-in");
                }
            } catch (err) {
                console.error("Failed to fetch user");
                router.push("/sign-in");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/sign-in");
        } catch (err) {
            console.error("Failed to logout");
        }
    };

    if (loading) {
        return <div className="min-h-screen pt-32 pb-20 flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-transparent pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto relative overflow-hidden animate-in fade-in duration-500">
            <Head>
                <title>My Profile | ANISHXNJ Plays</title>
            </Head>

            {/* Ambient Backgrounds */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full z-[-1] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full z-[-1] pointer-events-none"></div>

            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-black mb-2 text-white">Your <span className="text-gradient">Profile</span></h1>
                <p className="text-gray-400">Manage your account settings and view your history.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="md:col-span-1">
                    <div className="glass rounded-3xl p-8 border border-white/10 flex flex-col items-center text-center shadow-xl">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-black text-white mb-4 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                            {user.fullName ? user.fullName.charAt(0) : '?'}
                        </div>
                        <h2 className="text-xl font-bold text-white mb-1">{user.fullName}</h2>
                        <p className="text-gray-400 text-sm mb-6">{user.email || user.phone}</p>

                        <div className="w-full h-px bg-white/10 mb-6"></div>

                        <div className="w-full text-left space-y-4 mb-8">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Joined On</p>
                                <p className="text-sm text-white font-medium">
                                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Account ID</p>
                                <p className="text-xs font-mono text-gray-400 truncate">{user.id}</p>
                            </div>
                        </div>

                        <button 
                            onClick={handleLogout}
                            className="w-full py-3 px-4 rounded-xl bg-red-500/10 text-red-400 font-semibold hover:bg-red-500/20 transition-colors border border-red-500/20"
                        >
                            Log Out
                        </button>
                    </div>
                </div>

                {/* Dashboard / Info Area */}
                <div className="md:col-span-2 space-y-6">
                    <div className="glass rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                        <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-2xl">
                            <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                            <p className="text-gray-400">No recent transactions found.</p>
                            <button onClick={() => router.push("/portfolio")} className="mt-4 text-primary hover:text-white transition-colors text-sm font-medium">
                                Browse Store
                            </button>
                        </div>
                    </div>

                    <div className="glass rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                <div>
                                    <p className="font-medium text-white">Change Password</p>
                                    <p className="text-xs text-gray-400">Update your account security</p>
                                </div>
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </div>
                            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                <div>
                                    <p className="font-medium text-white">Payment Methods</p>
                                    <p className="text-xs text-gray-400">Manage your saved cards</p>
                                </div>
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
