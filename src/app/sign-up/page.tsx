"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call for creating an account
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);

            // Redirect to sign in or home after 2 seconds
            setTimeout(() => {
                router.push("/sign-in");
            }, 2000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center px-4 relative overflow-hidden">
            <Head>
                <title>Create Account | ANISHXNJ Plays</title>
            </Head>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[800px] bg-primary/20 blur-[120px] rounded-full z-[-1] pointer-events-none"></div>

            <div className="w-full max-w-md mt-10 mb-10">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block text-3xl font-black tracking-tighter mb-4">
                        ANISHXNJ <span className="text-gradient">Plays</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Create an Account</h1>
                    <p className="text-gray-400">Join us to access exclusive gear and rentals.</p>
                </div>

                <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                    {success ? (
                        <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
                            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
                            <p className="text-gray-400">Redirecting to sign in...</p>
                        </div>
                    ) : null}

                    <div className="flex bg-white/5 rounded-xl p-1 mb-8">
                        <button
                            type="button"
                            onClick={() => setLoginMethod("email")}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${loginMethod === "email" ? "bg-primary text-white shadow-lg" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Email
                        </button>
                        <button
                            type="button"
                            onClick={() => setLoginMethod("phone")}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${loginMethod === "phone" ? "bg-primary text-white shadow-lg" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Phone Number
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        {loginMethod === "email" ? (
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
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    placeholder="+977 98XXXXXXXX"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all ${isSubmitting
                                ? "bg-primary/50 cursor-not-allowed"
                                : "bg-primary hover:bg-primary-dark shadow-[0_0_20px_rgba(139,92,246,0.5)] transform hover:-translate-y-1"
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-gray-400 mt-8 text-sm">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="text-white font-medium hover:text-primary transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>

            {/* Global styles fix for fade-in animation */}
            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
