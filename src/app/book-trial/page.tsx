"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BookTrial() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [instrument, setInstrument] = useState("Guitar");
    const [experienceText, setExperienceText] = useState("Beginner");
    const [date, setDate] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("eSewa");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call for booking a trial
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);

            // Redirect back to learn page or home after 3 seconds
            setTimeout(() => {
                router.push("/learn");
            }, 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
            <Head>
                <title>Book a Trial | ANISHXNJ Plays</title>
            </Head>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-[900px] bg-primary/20 blur-[150px] rounded-full z-[-1] pointer-events-none"></div>

            <div className="w-full max-w-2xl mt-10 mb-10">
                <div className="text-center mb-12">
                    <Link href="/" className="inline-block text-3xl font-black tracking-tighter mb-4">
                        ANISHXNJ <span className="text-gradient">Plays</span>
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Book a <span className="text-gradient">Trial Session</span></h1>
                    <p className="text-lg text-gray-400 max-w-lg mx-auto">
                        Take the first step towards mastering your craft. Schedule a 1-on-1 trial session with our expert instructors.
                    </p>
                </div>

                <div className="glass rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
                    {success ? (
                        <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in text-center p-8">
                            <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
                            <p className="text-gray-300 text-lg mb-6">We've sent the details to your email. Get ready to jam!</p>
                            <div className="w-full max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary animate-progress"></div>
                            </div>
                            <p className="text-gray-500 mt-4 text-sm">Redirecting...</p>
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    placeholder="John Doe"
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
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Instrument of Interest</label>
                                <select
                                    value={instrument}
                                    onChange={(e) => setInstrument(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                                >
                                    <option value="Guitar">Guitar (Acoustic/Electric)</option>
                                    <option value="Piano">Piano & Keyboards</option>
                                    <option value="Drums">Drums & Percussion</option>
                                    <option value="Vocals">Vocals</option>
                                    <option value="Bass">Bass Guitar</option>
                                    <option value="Production">Music Production</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level</label>
                                <select
                                    value={experienceText}
                                    onChange={(e) => setExperienceText(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                                >
                                    <option value="Beginner">Beginner (Never played)</option>
                                    <option value="Novice">Novice (Know a few basics)</option>
                                    <option value="Intermediate">Intermediate (Can play songs)</option>
                                    <option value="Advanced">Advanced (Looking to master)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date</label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Any specific goals? (Optional)</label>
                            <textarea
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="E.g., I want to learn fingerstyle guitar, or I want to hit high notes..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
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
                            className={`w-full py-4 mt-4 rounded-xl text-white font-bold text-lg transition-all ${isSubmitting
                                ? "bg-primary/50 cursor-not-allowed"
                                : "bg-primary hover:bg-primary-dark shadow-[0_0_20px_rgba(139,92,246,0.5)] transform hover:-translate-y-1"
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Booking Session...
                                </div>
                            ) : (
                                "Book My Trial"
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
