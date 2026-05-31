"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

export default function AdminWaitlist() {
    const [waitlist, setWaitlist] = useState<any[]>([]);

    useEffect(() => {
        const storedWaitlist = JSON.parse(localStorage.getItem("waitlist") || "[]");
        setWaitlist(storedWaitlist);
    }, []);

    const handleDelete = (index: number) => {
        if (confirm("Remove this entry from the waitlist?")) {
            const newList = [...waitlist];
            newList.splice(index, 1);
            setWaitlist(newList);
            localStorage.setItem("waitlist", JSON.stringify(newList));
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <Head>
                <title>Admin Dashboard | Waitlist</title>
            </Head>
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Waitlist Management</h1>
                <p className="text-gray-400">Review users waiting for upcoming courses and cohorts.</p>
            </div>

            <div className="glass rounded-3xl border border-white/10 shadow-xl overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                                <th className="p-6 font-semibold whitespace-nowrap">ID</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Name</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Course</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Experience</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Payment</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Date</th>
                                <th className="p-6 font-semibold whitespace-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {waitlist.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-gray-500">
                                        No waitlist entries found.
                                    </td>
                                </tr>
                            ) : (
                                waitlist.map((entry, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-6 font-mono text-primary whitespace-nowrap">{entry.id}</td>
                                        <td className="p-6 text-white font-medium whitespace-nowrap">
                                            {entry.name}
                                            <div className="text-xs text-gray-500">{entry.email}</div>
                                        </td>
                                        <td className="p-6 text-gray-400 whitespace-nowrap">{entry.course}</td>
                                        <td className="p-6 text-gray-400 max-w-[200px] truncate" title={entry.experience}>{entry.experience || "-"}</td>
                                        <td className="p-6 text-gray-400 whitespace-nowrap">
                                            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">
                                                {entry.paymentMethod}
                                            </span>
                                        </td>
                                        <td className="p-6 text-gray-400 whitespace-nowrap">{entry.date}</td>
                                        <td className="p-6 text-right whitespace-nowrap">
                                            <button
                                                onClick={() => handleDelete(i)}
                                                className="text-red-400 hover:text-red-300 transition-colors text-sm font-semibold px-3 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(139, 92, 246, 0.5);
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
}
