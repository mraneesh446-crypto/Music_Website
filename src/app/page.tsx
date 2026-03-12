"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Instrument {
  id: string;
  name: string;
  type: string;
  category: string;
  brand: string;
  price: number;
  rentPriceDaily: number;
  image: string;
  description: string;
  features: string[];
  isNew: boolean;
  inStock: boolean;
}

interface CartItem {
  cartId: string;
  id: string;
  name: string;
  price: number;
  type: "Sale" | "Rent";
  image: string;
}

export default function Home() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    localStorage.setItem("anishxnj_cart", JSON.stringify(cart));
    router.push("/checkout");
  };

  const addToCart = (instrument: Instrument, type: "Sale" | "Rent") => {
    setCart((prev) => [
      ...prev,
      {
        cartId: Math.random().toString(36).substr(2, 9),
        id: instrument.id,
        name: instrument.name,
        price: type === "Sale" ? instrument.price : instrument.rentPriceDaily,
        type,
        image: instrument.image,
      },
    ]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  useEffect(() => {
    async function fetchInstruments() {
      try {
        const res = await fetch("/api/instruments");
        const data = await res.json();
        setInstruments(data.instruments);
      } catch (error) {
        console.error("Error fetching instruments:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchInstruments();
  }, []);

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 z-[-1] bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-transparent to-black"></div>

        {/* Highlighted Promo Banner */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/50 bg-primary/10 backdrop-blur-md mb-8 animate-fade-in hover:scale-105 transition-transform shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <p className="text-sm md:text-base text-gray-200 font-medium tracking-wide">
            <strong className="text-white">Special Offer:</strong> First 30 buyers get <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 font-bold uppercase tracking-wider">free music classes</span> for two months!
          </p>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
          Elevate Your Sound with <br />
          <span className="text-gradient">Premium Instruments</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl">
          Discover the perfect instrument for your next masterpiece. Buy or rent top-tier gear curated for professional musicians and passionate beginners.
        </p>
        <div className="flex gap-4 flex-col sm:flex-row">
          <button
            onClick={() => document.getElementById('featured-gear')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:scale-105 transition-transform"
          >
            Explore Collection
          </button>
          <button
            onClick={() => document.getElementById('rental-gear')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full glass text-white font-semibold text-lg hover:bg-white/10 transition-colors border border-white/20"
          >
            View Rentals
          </button>
        </div>
      </section>

      {/* Featured Collection Section - Sales */}
      <section id="featured-gear" className="py-20 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Instruments for Sale</h2>
            <p className="text-gray-400">Hand-picked premium instruments for your collection.</p>
          </div>
          <button className="text-primary hover:text-white transition-colors font-medium">
            View All Sales →
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instruments.map((instrument) => (
              <div
                key={`sale-${instrument.id}`}
                className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={instrument.image}
                    alt={instrument.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {instrument.isNew && (
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      New
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs text-primary font-semibold uppercase tracking-wider">
                      {instrument.category}
                    </div>
                    {instrument.brand && (
                      <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-md border border-white/5 font-medium tracking-wide">
                        {instrument.brand}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{instrument.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {instrument.description}
                  </p>

                  <ul className="text-xs text-gray-400 mb-6 space-y-1.5">
                    {instrument.features?.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between items-center pt-4 border-t border-white/10 mb-4">
                    <div className="text-sm">
                      <span className="text-gray-400">Buy for </span>
                      <span className="font-semibold text-white">NPR {instrument.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 py-2.5 rounded-xl glass hover:bg-white/10 transition-colors border border-white/20 text-white text-sm font-medium">
                      Details
                    </button>
                    <button
                      onClick={() => addToCart(instrument, 'Sale')}
                      className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Rental Collection Section */}
      <section id="rental-gear" className="py-20 px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Gear for Rent</h2>
            <p className="text-gray-400">Top-tier equipment available for your next studio session or tour.</p>
          </div>
          <button className="text-primary hover:text-white transition-colors font-medium">
            View All Rentals →
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instruments.map((instrument) => (
              <div
                key={`rent-${instrument.id}`}
                className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300 border-l border-primary/20"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={instrument.image}
                    alt={instrument.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 left-4 bg-purple-600/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Rental Available
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs text-primary font-semibold uppercase tracking-wider">
                      {instrument.category}
                    </div>
                    {instrument.brand && (
                      <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-md border border-white/5 font-medium tracking-wide">
                        {instrument.brand}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{instrument.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {instrument.description}
                  </p>

                  <ul className="text-xs text-gray-400 mb-6 space-y-1.5">
                    {instrument.features?.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between items-center pt-4 border-t border-white/10 mb-4">
                    <div className="text-sm">
                      <span className="text-gray-400">Rent for </span>
                      <span className="font-semibold text-white">NPR {instrument.rentPriceDaily.toLocaleString()}/day</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 py-2.5 rounded-xl glass hover:bg-white/10 transition-colors border border-white/20 text-white text-sm font-medium">
                      Details
                    </button>
                    <button
                      onClick={() => addToCart(instrument, 'Rent')}
                      className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-gray-500 glass mt-20">
        <p className="mb-4 text-xl font-bold text-white tracking-tighter">
          ANISHXNJ <span className="text-gradient">Plays</span>
        </p>
        <p>© 2026 ANISHXNJ Plays. Elevating your sound.</p>
      </footer>

      {/* Floating Cart Widget */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary-dark transition-colors flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)] relative"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path>
          </svg>
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center border-2 border-black">
              {cart.length}
            </span>
          )}
        </button>

        {isCartOpen && (
          <div className="absolute bottom-20 left-0 w-80 sm:w-96 glass border border-white/20 rounded-2xl shadow-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Your Cart</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-6">Your cart is currently empty.</p>
            ) : (
              <div className="flex-1 overflow-y-auto max-h-64 space-y-4 pr-2">
                {cart.map((item) => (
                  <div key={item.cartId} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-bold line-clamp-1">{item.name}</h4>
                      <div className="text-xs text-primary mb-1">{item.type}</div>
                      <div className="text-sm text-gray-300">NPR {item.price.toLocaleString()}{item.type === 'Rent' ? '/day' : ''}</div>
                    </div>
                    <button onClick={() => removeFromCart(item.cartId)} className="p-2 text-gray-500 hover:text-red-400 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 text-sm">Total:</span>
                  <span className="text-xl font-bold text-white">
                    NPR {cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                  </span>
                </div>
                <button onClick={handleCheckout} className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
