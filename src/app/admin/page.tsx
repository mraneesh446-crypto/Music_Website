"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

export default function AdminOverview() {
    const [stats, setStats] = useState({
        users: 0,
        waitlist: 0,
        revenue: 0,
        recentUsers: [] as any[]
    });

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const waitlist = JSON.parse(localStorage.getItem("waitlist") || "[]");
        
        // Mock revenue
        const revenue = 495000;

        setStats({
            users: users.length,
            waitlist: waitlist.length,
            revenue,
            recentUsers: users.slice(-5).reverse() // get 5 most recent
        });
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <Head>
                <title>Admin Dashboard | Overview</title>
            </Head>
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-gray-400">Welcome to your admin panel. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-medium">Total Users</p>
                            <h3 className="text-3xl font-bold text-white">{stats.users}</h3>
                        </div>
                    </div>
                    <div className="text-sm text-green-400 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                        <span>+12% from last month</span>
                    </div>
                </div>

                <div className="glass p-6 rounded-2xl border border-white/10 hover:border-secondary/50 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-medium">Waitlist Entries</p>
                            <h3 className="text-3xl font-bold text-white">{stats.waitlist}</h3>
                        </div>
                    </div>
                    <div className="text-sm text-green-400 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                        <span>+5 new this week</span>
                    </div>
                </div>

                <div className="glass p-6 rounded-2xl border border-white/10 hover:border-green-500/50 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-medium">Total Revenue (NPR)</p>
                            <h3 className="text-3xl font-bold text-white">Rs. {stats.revenue.toLocaleString()}</h3>
                        </div>
                    </div>
                    <div className="text-sm text-gray-400 flex items-center gap-1">
                        <span>Based on mock transactions</span>
                    </div>
                </div>
            </div>

            <div className="glass rounded-3xl border border-white/10 p-8 mt-8">
                <h2 className="text-xl font-bold text-white mb-6">Recently Registered Users</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 text-gray-400 text-sm">
                                <th className="pb-4 font-semibold">Name</th>
                                <th className="pb-4 font-semibold">Contact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {stats.recentUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={2} className="py-8 text-center text-gray-500">No users found.</td>
                                </tr>
                            ) : (
                                stats.recentUsers.map((u, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="py-4 text-white font-medium">{u.fullName}</td>
                                        <td className="py-4 text-gray-400">{u.email || u.phone}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
