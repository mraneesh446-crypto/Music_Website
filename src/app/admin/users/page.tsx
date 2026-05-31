"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

export default function AdminUsers() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        setUsers(storedUsers);
    }, []);

    const handleDelete = (index: number) => {
        if (confirm("Are you sure you want to delete this user?")) {
            const newUsers = [...users];
            newUsers.splice(index, 1);
            setUsers(newUsers);
            localStorage.setItem("users", JSON.stringify(newUsers));
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <Head>
                <title>Admin Dashboard | Users</title>
            </Head>
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Manage Users</h1>
                <p className="text-gray-400">View and manage all registered accounts on the platform.</p>
            </div>

            <div className="glass rounded-3xl border border-white/10 shadow-xl overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                                <th className="p-6 font-semibold whitespace-nowrap">Name</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Email / Phone</th>
                                <th className="p-6 font-semibold whitespace-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="p-12 text-center text-gray-500">
                                        No users registered yet.
                                    </td>
                                </tr>
                            ) : (
                                users.map((u, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-6 text-white font-medium whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs uppercase">
                                                    {u.fullName ? u.fullName.charAt(0) : '?'}
                                                </div>
                                                {u.fullName || 'Unknown'}
                                            </div>
                                        </td>
                                        <td className="p-6 text-gray-400 whitespace-nowrap">{u.email || u.phone}</td>
                                        <td className="p-6 text-right whitespace-nowrap">
                                            <button
                                                onClick={() => handleDelete(i)}
                                                className="text-red-400 hover:text-red-300 transition-colors text-sm font-semibold px-3 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20"
                                            >
                                                Delete
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
