"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Waitlist() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("Production Masterclass");
    const [experience, setExperience] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("eSewa");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call to join waitlist
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);

            // Redirect back to learn page after 3 seconds
            setTimeout(() => {
                router.push("/learn");
            }, 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
            <Head>
                <title>Join the Waitlist | ANISHXNJ Plays</title>
            </Head>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-[900px] bg-primary/20 blur-[150px] rounded-full z-[-1] pointer-events-none"></div>

            <div className="w-full max-w-xl mt-10 mb-10">
                <div className="text-center mb-12">
                    <Link href="/" className="inline-block text-3xl font-black tracking-tighter mb-4">
                        ANISHXNJ <span className="text-gradient">Plays</span>
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Join the <span className="text-gradient">Waitlist</span></h1>
                    <p className="text-lg text-gray-400 max-w-md mx-auto">
                        Our cohorts fill up fast. Secure your spot in the next session and elevate your skills.
                    </p>
                </div>

                <div className="glass rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
                    {success ? (
                        <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in text-center p-8">
                            <div className="w-24 h-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">You're on the list!</h2>
                            <p className="text-gray-300 text-lg mb-6">We'll notify you as soon as the next cohort opens up.</p>
                            <div className="w-full max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary animate-progress"></div>
                            </div>
                            <p className="text-gray-500 mt-4 text-sm">Returning to classes...</p>
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="Jane Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="jane@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Program of Interest</label>
                            <select
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                            >
                                <option value="Production Masterclass">Production Masterclass (8 Weeks)</option>
                                <option value="Advanced Mixing">Advanced Mixing Workshop</option>
                                <option value="Songwriting Cohort">Songwriting & Composition Cohort</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Current Experience Level</label>
                            <input
                                type="text"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="E.g., I've been producing for 2 years in Ableton..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Waitlist Hold/Deposit Payment Method</label>
                            <div className="grid grid-cols-3 gap-4">
                                {["eSewa", "Khalti", "Credit Card"].map((method) => (
                                    <div
                                        key={method}
                                        onClick={() => setPaymentMethod(method)}
                                        className={`cursor-pointer border rounded-xl py-3 px-4 text-center transition-all ${paymentMethod === method ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                    >
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            {method === "eSewa" && <div className="text-xl text-green-500 font-bold">eSewa</div>}
                                            {method === "Khalti" && <div className="text-xl text-purple-400 font-bold">Khalti</div>}
                                            {method === "Credit Card" && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>}
                                            {method === "Credit Card" && <span className="text-xs">Card</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 mt-6 rounded-xl text-white font-bold text-lg transition-all border border-transparent ${isSubmitting
                                ? "bg-primary/50 cursor-not-allowed"
                                : "bg-primary hover:bg-primary-dark shadow-[0_0_20px_rgba(139,92,246,0.3)] transform hover:-translate-y-1"
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Adding to Waitlist...
                                </div>
                            ) : (
                                "Join Waitlist"
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Global styles fix for animations */}
            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                .animate-progress {
                    animation: progress 3s linear forwards;
                }
            `}</style>
        </div>
    );
}
