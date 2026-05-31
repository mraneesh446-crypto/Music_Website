"use client";

import { useState } from "react";
import Head from "next/head";
import { mockTransactions, Transaction } from "@/data/mockData";

export default function AdminTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
    
    const getStatusStyle = (status: Transaction["status"]) => {
        switch (status) {
            case "Paid":
                return "bg-green-500/10 text-green-400 border-green-500/20";
            case "Unpaid":
                return "bg-red-500/10 text-red-400 border-red-500/20";
            case "Pending":
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
        }
    };

    const handleUpdateStatus = (index: number, newStatus: Transaction["status"]) => {
        const updated = [...transactions];
        updated[index].status = newStatus;
        setTransactions(updated);
        // Note: we are just updating local state for the prototype, not global mockData.ts
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <Head>
                <title>Admin Dashboard | Transactions</title>
            </Head>
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Transactions</h1>
                <p className="text-gray-400">Monitor all revenue, sales, and rentals across the platform.</p>
            </div>

            <div className="glass rounded-3xl border border-white/10 shadow-xl overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                                <th className="p-6 font-semibold whitespace-nowrap">ID</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Customer</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Item</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Amount</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Method</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Status</th>
                                <th className="p-6 font-semibold whitespace-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-gray-500">
                                        No transactions found.
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((txn, i) => (
                                    <tr key={txn.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-6 font-mono text-gray-300 whitespace-nowrap">{txn.id}</td>
                                        <td className="p-6 text-white font-medium whitespace-nowrap">{txn.customer}</td>
                                        <td className="p-6 text-gray-400 max-w-[200px] truncate" title={txn.items}>{txn.items}</td>
                                        <td className="p-6 text-white font-bold whitespace-nowrap">NPR {txn.amount.toLocaleString()}</td>
                                        <td className="p-6 text-gray-400 whitespace-nowrap">{txn.method}</td>
                                        <td className="p-6 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(txn.status)}`}>
                                                {txn.status}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right whitespace-nowrap">
                                            <select 
                                                value={txn.status}
                                                onChange={(e) => handleUpdateStatus(i, e.target.value as Transaction["status"])}
                                                className="bg-black/50 border border-white/10 rounded-lg px-2 py-1 text-sm text-gray-300 focus:outline-none focus:border-primary"
                                            >
                                                <option value="Paid">Mark Paid</option>
                                                <option value="Unpaid">Mark Unpaid</option>
                                                <option value="Pending">Mark Pending</option>
                                            </select>
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
