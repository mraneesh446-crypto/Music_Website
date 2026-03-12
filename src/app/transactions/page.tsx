"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

interface Transaction {
    id: string;
    date: string;
    amount: number;
    method: "Credit Card" | "eSewa" | "Cash on Delivery";
    status: "Paid" | "Unpaid" | "Pending";
    items: string;
}

const mockTransactions: Transaction[] = [
    {
        id: "TXN-982341",
        date: "2026-03-01",
        amount: 250000,
        method: "Credit Card",
        status: "Paid",
        items: "Fender Stratocaster (Sale)"
    },
    {
        id: "TXN-761298",
        date: "2026-03-02",
        amount: 5000,
        method: "eSewa",
        status: "Paid",
        items: "Yamaha Grand Piano (Rent - 2 Days)"
    },
    {
        id: "TXN-654112",
        date: "2026-03-03",
        amount: 155000,
        method: "Cash on Delivery",
        status: "Unpaid",
        items: "Roland V-Drums (Sale)"
    },
    {
        id: "TXN-334991",
        date: "2026-03-04",
        amount: 85000,
        method: "Credit Card",
        status: "Pending",
        items: "Moog Subsequent 37 (Sale)"
    }
];

export default function Transactions() {
    const [filter, setFilter] = useState<"All" | "Paid" | "Unpaid">("All");
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    const filteredTransactions = mockTransactions.filter(txn => {
        if (filter === "All") return true;
        if (filter === "Paid") return txn.status === "Paid";
        if (filter === "Unpaid") return txn.status === "Unpaid" || txn.status === "Pending";
        return true;
    });

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

    return (
        <div className="min-h-screen bg-transparent pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden">
            <Head>
                <title>Transaction History | ANISHXNJ Plays</title>
            </Head>

            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full z-[-1] pointer-events-none"></div>

            <div className="mb-8">
                <Link href="/" className="inline-flex items-center text-primary hover:text-white transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Store
                </Link>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black mb-2 text-white">Your <span className="text-gradient">Transactions</span></h1>
                    <p className="text-gray-400">View and manage all your past payments and statements.</p>
                </div>

                <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                    <button
                        onClick={() => setFilter("All")}
                        className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${filter === "All" ? "bg-primary text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter("Paid")}
                        className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${filter === "Paid" ? "bg-green-500/20 text-green-400 shadow-lg border border-green-500/30" : "text-gray-400 hover:text-white"}`}
                    >
                        Paid
                    </button>
                    <button
                        onClick={() => setFilter("Unpaid")}
                        className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${filter === "Unpaid" ? "bg-red-500/20 text-red-400 shadow-lg border border-red-500/30" : "text-gray-400 hover:text-white"}`}
                    >
                        Unpaid
                    </button>
                </div>
            </div>

            <div className="glass rounded-3xl border border-white/10 shadow-xl overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                                <th className="p-6 font-semibold whitespace-nowrap">Transaction ID</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Date</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Items</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Amount</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Method</th>
                                <th className="p-6 font-semibold whitespace-nowrap">Status</th>
                                <th className="p-6 font-semibold whitespace-nowrap text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-gray-500">
                                        No transactions found matching your filter.
                                    </td>
                                </tr>
                            ) : (
                                filteredTransactions.map((txn) => (
                                    <tr key={txn.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-6 font-mono text-gray-300 whitespace-nowrap">{txn.id}</td>
                                        <td className="p-6 text-gray-400 whitespace-nowrap">{txn.date}</td>
                                        <td className="p-6 text-white font-medium max-w-xs truncate">{txn.items}</td>
                                        <td className="p-6 text-white font-bold whitespace-nowrap">NPR {txn.amount.toLocaleString()}</td>
                                        <td className="p-6 text-gray-400 whitespace-nowrap">{txn.method}</td>
                                        <td className="p-6 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(txn.status)}`}>
                                                {txn.status}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right whitespace-nowrap">
                                            <button
                                                onClick={() => setSelectedTransaction(txn)}
                                                className="text-primary hover:text-primary-dark transition-colors text-sm font-semibold opacity-0 group-hover:opacity-100 focus:opacity-100 translate-x-4 group-hover:translate-x-0 duration-300"
                                            >
                                                View Receipt →
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Receipt Modal */}
            {selectedTransaction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedTransaction(null)}>
                    <div
                        className="bg-[#1a1a24] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] -z-10 pointer-events-none"></div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Digital Receipt</h3>
                                <p className="text-sm text-gray-400 mt-1">{selectedTransaction.date}</p>
                            </div>
                            <button
                                onClick={() => setSelectedTransaction(null)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Transaction ID</p>
                                    <p className="text-lg font-mono text-white tracking-wider">{selectedTransaction.id}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(selectedTransaction.status)}`}>
                                    {selectedTransaction.status}
                                </span>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Purchase Details</h4>
                                <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                                    <div className="flex justify-between items-start">
                                        <div className="pr-4">
                                            <p className="text-white font-medium">{selectedTransaction.items}</p>
                                        </div>
                                        <p className="text-white font-semibold whitespace-nowrap">NPR {selectedTransaction.amount.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Payment Information</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                                        <p className="text-xs text-gray-500 mb-1">Method</p>
                                        <p className="text-white font-medium flex items-center gap-2">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                            {selectedTransaction.method}
                                        </p>
                                    </div>
                                    <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                                        <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                                        <p className="text-primary font-bold">NPR {selectedTransaction.amount.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 bg-white/5 flex gap-3">
                            <button
                                className="flex-1 py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center justify-center gap-2"
                                onClick={() => {
                                    alert('Receipt downloaded successfully!');
                                }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                Download PDF
                            </button>
                            <button
                                onClick={() => setSelectedTransaction(null)}
                                className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors border border-white/10"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(139, 92, 246, 0.8);
                }
            `}</style>
        </div >
    );
}
