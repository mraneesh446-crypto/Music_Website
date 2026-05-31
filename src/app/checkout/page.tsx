"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartItem {
    cartId: string;
    id: string;
    name: string;
    price: number;
    type: "Sale" | "Rent";
    image: string;
}

export default function Checkout() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<"card" | "esewa" | "cod">("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [payerName, setPayerName] = useState("");
    const [remarks, setRemarks] = useState("");
    const [orderNumber, setOrderNumber] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Load cart from local storage
        const savedCart = localStorage.getItem("anishxnj_cart");
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setTimeout(() => {
                    setCart(parsedCart);
                }, 0);
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        // Generate a random order number once when the component mounts
        setTimeout(() => {
            setOrderNumber(Math.floor(Math.random() * 1000000).toString().padStart(6, '0'));
        }, 0);
    }, []);

    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const tax = subtotal * 0.13; // 13% VAT
    const total = subtotal + tax;

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setSuccess(true);
            localStorage.removeItem("anishxnj_cart"); // Clear cart

            // Redirect back to home after 3 seconds
            setTimeout(() => {
                router.push("/");
            }, 3000);
        }, 2000);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-transparent flex flex-col items-center justify-center px-4 relative overflow-hidden">
                <Head>
                    <title>Payment Successful | ANISHXNJ Plays</title>
                </Head>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-green-500/10 blur-[120px] rounded-full z-[-1] pointer-events-none"></div>

                <div className="glass rounded-3xl p-10 max-w-lg w-full text-center border border-white/10 shadow-2xl animate-fade-in relative overflow-hidden">
                    <div className="w-24 h-24 mx-auto bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Payment Successful!</h2>
                    <p className="text-gray-300 mb-8 text-lg">Thank you for your purchase. Your premium gear is getting ready.</p>

                    <div className="w-full bg-white/5 rounded-xl p-4 mb-8 text-left border border-white/10">
                        <div className="flex justify-between text-sm mb-2 text-gray-400">
                            <span>Payer Name</span>
                            <span className="text-white font-medium">{payerName || 'Guest'}</span>
                        </div>
                        {remarks && (
                            <div className="flex justify-between text-sm mb-2 text-gray-400 gap-4">
                                <span>Remarks</span>
                                <span className="text-white text-right break-words">{remarks}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm mb-2 text-gray-400">
                            <span>Order Number</span>
                            <span className="text-white font-mono">#{orderNumber}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2 text-gray-400">
                            <span>Amount Paid</span>
                            <span className="text-white font-bold">NPR {total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>Payment Method</span>
                            <span className="text-white capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod}</span>
                        </div>
                    </div>

                    <div className="w-full max-w-xs mx-auto h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 animate-progress"></div>
                    </div >
                    <p className="text-gray-500 mt-4 text-sm">Heading back home...</p>
                </div >
                {/* Global styles fix for animations */}
                < style jsx global > {`
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
                `}</style >
            </div >
        );
    }

    return (
        <div className="min-h-screen bg-transparent pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden">
            <Head>
                <title>Checkout | ANISHXNJ Plays</title>
            </Head>

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full z-[-1] pointer-events-none"></div>

            <div className="mb-8">
                <Link href="/" className="inline-flex items-center text-primary hover:text-white transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Store
                </Link>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-12">Secure <span className="text-gradient">Checkout</span></h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Column: Order Summary */}
                <div className="w-full lg:w-5/12 order-2 lg:order-1">
                    <div className="glass rounded-3xl p-6 md:p-8 border border-white/10 shadow-xl sticky top-32">
                        <h2 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">Order Summary</h2>

                        {cart.length === 0 ? (
                            <p className="text-gray-400 py-8 text-center bg-white/5 rounded-xl border border-white/5">Your cart is empty.</p>
                        ) : (
                            <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.cartId} className="flex gap-4 items-center bg-white/5 p-3 rounded-2xl border border-white/5">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white text-sm line-clamp-2 leading-snug mb-1">{item.name}</h4>
                                            <div className="text-xs text-primary bg-primary/10 inline-block px-2 py-0.5 rounded-md mb-2">{item.type}</div>
                                            <div className="text-gray-300 font-semibold text-sm">NPR {item.price.toLocaleString()}{item.type === 'Rent' ? '/day' : ''}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="space-y-3 pt-6 border-t border-white/10">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>NPR {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Taxes (13%)</span>
                                <span>NPR {tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            </div>
                            <div className="flex justify-between text-white font-black text-xl pt-4 border-t border-white/10">
                                <span>Total</span>
                                <span className="text-primary">NPR {total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Payment & Details */}
                <div className="w-full lg:w-7/12 order-1 lg:order-2">
                    <div className="glass rounded-3xl p-6 md:p-8 border border-white/10 shadow-xl mb-8">
                        <h2 className="text-2xl font-bold mb-6 text-white">Payment Method</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <label className={`cursor-pointer rounded-2xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="sr-only" />
                                <svg className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-primary' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                <span className={`font-semibold text-sm ${paymentMethod === 'card' ? 'text-white' : 'text-gray-400'}`}>Credit/Debit Card</span>
                            </label>

                            <label className={`cursor-pointer rounded-2xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'esewa' ? 'border-green-500 bg-green-500/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                                <input type="radio" name="payment" value="esewa" checked={paymentMethod === 'esewa'} onChange={() => setPaymentMethod('esewa')} className="sr-only" />
                                <div className={`w-8 h-8 rounded-md flex items-center justify-center font-black text-xs ${paymentMethod === 'esewa' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'}`}>eS</div>
                                <span className={`font-semibold text-sm ${paymentMethod === 'esewa' ? 'text-white' : 'text-gray-400'}`}>eSewa / Khalti</span>
                            </label>

                            <label className={`cursor-pointer rounded-2xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="sr-only" />
                                <svg className={`w-8 h-8 ${paymentMethod === 'cod' ? 'text-primary' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                <span className={`font-semibold text-sm ${paymentMethod === 'cod' ? 'text-white' : 'text-gray-400'}`}>Cash on Delivery</span>
                            </label>
                        </div>

                        <form onSubmit={handlePayment}>
                            <div className="space-y-4 mb-6 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Label / Name</label>
                                    <input type="text" required value={payerName} onChange={(e) => setPayerName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Enter your name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Remarks / Delivery Notes (Optional)</label>
                                    <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Any special instructions?" />
                                </div>
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="space-y-5 animate-fade-in pt-4 border-t border-white/10">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                                        <div className="relative">
                                            <input type="text" required pattern="\d{16}" maxLength={16} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="0000 0000 0000 0000" />
                                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                                            <input type="text" required placeholder="MM/YY" maxLength={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">CVC</label>
                                            <input type="text" required placeholder="123" maxLength={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'esewa' && (
                                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 mb-2 animate-fade-in text-center">
                                    <div className="w-16 h-16 mx-auto bg-green-500 rounded-xl flex items-center justify-center mb-4 text-white font-black text-2xl shadow-[0_0_20px_rgba(34,197,94,0.4)]">eS</div>
                                    <p className="text-gray-300 text-sm mb-4">You will be redirected to the eSewa / Khalti secure portal to complete your payment.</p>
                                    <div className="text-xs text-green-400 font-semibold bg-green-500/20 py-2 px-4 rounded-full inline-block">Secure 256-bit Encryption</div>
                                </div>
                            )}

                            {paymentMethod === 'cod' && (
                                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-2 animate-fade-in">
                                    <h3 className="text-lg font-bold text-white mb-2">Pay when you receive!</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">Please prepare exact change if possible. Our delivery executives carry limited change. Your premium instrument will be delivered to your doorstep.</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isProcessing || cart.length === 0}
                                className={`w-full py-4 mt-8 rounded-xl text-white font-bold text-lg transition-all flex items-center justify-center gap-2 ${isProcessing || cart.length === 0
                                    ? "bg-gray-600 cursor-not-allowed opacity-50"
                                    : "bg-primary hover:bg-primary-dark shadow-[0_0_20px_rgba(139,92,246,0.4)] transform hover:-translate-y-1"
                                    }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                        Pay NPR {total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                Payments are 100% secure & encrypted
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
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
        </div>
    );
}
