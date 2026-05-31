"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: loginMethod === "email" ? email : undefined,
                    phone: loginMethod === "phone" ? phone : undefined,
                    password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setIsSubmitting(false);
                setError(data.error || "Invalid credentials. Please try again.");
                return;
            }

            setIsSubmitting(false);
            setSuccess(true);

            setTimeout(() => {
                router.push("/");
            }, 2000);
        } catch (err) {
            setIsSubmitting(false);
            setError("Network error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[800px] bg-primary/20 blur-[120px] rounded-full z-[-1] pointer-events-none"></div>

            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block text-3xl font-black tracking-tighter mb-4">
                        ANISHXNJ <span className="text-gradient">Plays</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to access your gear and rentals.</p>
                </div>

                <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                    {success ? (
                        <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
                            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Sign In Successful!</h2>
                            <p className="text-gray-400">Redirecting to home...</p>
                        </div>
                    ) : null}

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl p-4 mb-6 text-sm text-center">
                            {error}
                        </div>
                    )}

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
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-300">Password</label>
                                <Link href="#" className="text-xs text-primary hover:text-purple-400 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
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
                                    Signing In...
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-gray-400 mt-8 text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/sign-up" className="text-white font-medium hover:text-primary transition-colors">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>

        </div>
    );
}
