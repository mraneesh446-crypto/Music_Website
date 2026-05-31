"use client";

import Head from "next/head";
import Image from "next/image";

const portfolioItems = [
    {
        client: "Luna Records",
        project: "Studio Equipment Overhaul",
        image: "https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?w=800&q=80",
        description: "Equipped an entire tracking room with a mix of vintage analog synthesisers and modern digital workstations. Highlighted by our sourced Yamaha Grand Piano.",
        tags: ["Studio", "Keyboards", "Installation"]
    },
    {
        client: "Neon Dreams Tour 2025",
        project: "Live Rig Setup",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
        description: "Provided and maintained touring instruments for the indie-pop group across their 40-date international tour, featuring Fender Stratocasters and Roland Percussion.",
        tags: ["Live", "Guitars", "Percussion"]
    },
    {
        client: "Echo Film Scores",
        project: "Orchestral Tracking Session",
        image: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=800&q=80",
        description: "Supplied rare Stradivarius replica violins and Selmer saxophones for a Grammy-nominated film score recording.",
        tags: ["Orchestral", "Strings", "Rental"]
    },
    {
        client: "The Vanguard Club",
        project: "House Band Backline",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
        description: "A permanent installation of top-tier amplifiers, custom drum kits, and grand pianos for an iconic jazz and blues nightclub.",
        tags: ["Venue", "Drums", "Amps"]
    }
];

export default function Portfolio() {
    return (
        <div className="min-h-screen bg-transparent relative overflow-hidden">
            <Head>
                <title>Portfolio | ANISHXNJ Plays</title>
            </Head>

            {/* Background glowing orbs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full z-[-1] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[40%] right-0 w-[400px] h-[400px] bg-blue-500/20 blur-[150px] rounded-full z-[-1] pointer-events-none translate-x-1/3"></div>

            <div className="px-4 md:px-8 max-w-7xl mx-auto py-24 md:py-32">
                <div className="text-center mb-24">
                    <div className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-primary font-semibold text-sm tracking-widest uppercase mb-6 animate-fade-in">
                        Our Success Stories
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-500">Portfolio</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium">
                        Take a look at how ANISHXNJ Plays instruments are backing the biggest tours, studios, and musicians worldwide.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-32">
                    {portfolioItems.map((item, index) => (
                        <div
                            key={index}
                            className="group relative rounded-[2rem] overflow-hidden glass border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.2)]"
                        >
                            <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
                                <Image
                                    src={item.image}
                                    alt={item.project}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute top-6 left-6 z-20 flex gap-2">
                                    {item.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white rounded-full border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 md:p-10 relative z-20 -mt-20">
                                <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl transition-transform duration-500 group-hover:-translate-y-4">
                                    <div className="text-primary font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                        {item.client}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                        {item.project}
                                    </h2>
                                    <p className="text-gray-400 leading-relaxed max-w-md">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="relative rounded-[3rem] glass border border-white/10 overflow-hidden flex flex-col lg:flex-row items-center">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full z-[-1] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

                    <div className="w-full lg:w-5/12 p-12 md:p-20 text-center lg:text-left z-10">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">Want Your Project <span className="text-gradient">Featured Here?</span></h2>
                        <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto md:mx-0">
                            Whether you&apos;re opening a new studio or plotting a massive stadium tour, ANISHXNJ Plays is ready to equip your team with the absolute best.
                        </p>
                        <a href="mailto:mraneesh446@gmail.com" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-lg transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] group">
                            Contact Us Today
                            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </a>
                    </div>

                    <div className="w-full lg:w-7/12 p-8 flex flex-col sm:flex-row gap-6 justify-center items-stretch z-10">
                        {/* Card 1: Anish Pokhrel */}
                        <div className="text-center p-8 glass rounded-[2rem] border border-white/5 backdrop-blur-2xl bg-black/40 relative group flex-1 max-w-sm hover:border-primary/30 transition-colors flex flex-col justify-between">
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div>
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <div className="absolute inset-0 rounded-full border-2 border-primary/50 border-dashed animate-[spin_10s_linear_infinite]"></div>
                                    <Image
                                        src="/images/profile.png"
                                        alt="Anish Pokhrel"
                                        width={128}
                                        height={128}
                                        className="w-full h-full rounded-full object-cover p-1 relative z-10"
                                        unoptimized
                                        onError={(e) => {
                                            // Fallback if image doesn't exist
                                            (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Anish+Pokhrel&background=8B5CF6&color=fff&size=200';
                                        }}
                                    />
                                    <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-500 border-2 border-black z-20"></div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-1">Anish Pokhrel</h3>
                                <p className="text-primary font-bold uppercase tracking-widest text-xs mb-6">A&R Director</p>
                            </div>

                            <div className="space-y-3 text-sm text-gray-300 mt-auto">
                                <a href="tel:9862025216" className="flex items-center justify-center gap-3 hover:text-white transition-colors p-3 rounded-xl bg-white/5 hover:bg-white/10">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    9862025216
                                </a>
                                <a href="mailto:mraneesh446@gmail.com" className="flex items-center justify-center gap-3 hover:text-white transition-colors p-3 rounded-xl bg-white/5 hover:bg-white/10">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    mraneesh446@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Card 2: Narbadha Thapa */}
                        <div className="text-center p-8 glass rounded-[2rem] border border-white/5 backdrop-blur-2xl bg-black/40 relative group flex-1 max-w-sm hover:border-primary/30 transition-colors flex flex-col justify-between">
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div>
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <div className="absolute inset-0 rounded-full border-2 border-primary/50 border-dashed animate-[spin_10s_linear_infinite]"></div>
                                    <Image
                                        src="/images/profile2.png"
                                        alt="Narbadha Thapa"
                                        width={128}
                                        height={128}
                                        className="w-full h-full rounded-full object-cover p-1 relative z-10"
                                        unoptimized
                                        onError={(e) => {
                                            // Fallback placeholder
                                            (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Narbadha+Thapa&background=8B5CF6&color=fff&size=200';
                                        }}
                                    />
                                    <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-amber-500 border-2 border-black z-20 animate-pulse"></div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-1">Narbadha Thapa</h3>
                                <p className="text-primary font-bold uppercase tracking-widest text-xs mb-6">Co-Director</p>
                            </div>

                            <div className="space-y-3 text-sm text-gray-300 mt-auto">
                                <a href="tel:98XXXXXXXX" className="flex items-center justify-center gap-3 hover:text-white transition-colors p-3 rounded-xl bg-white/5 hover:bg-white/10">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    98XXXXXXXX
                                </a>
                                <a href="mailto:narbadhathapakc@gmail.com" className="flex items-center justify-center gap-3 hover:text-white transition-colors p-3 rounded-xl bg-white/5 hover:bg-white/10">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    narbadhathapakc@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 text-center text-gray-500 glass mt-10 relative z-10 w-full flex flex-col items-center">
                <p className="mb-4 text-xl font-bold text-white tracking-tighter">
                    ANISHXNJ <span className="text-gradient">Plays</span>
                </p>
                <p>© 2026 ANISHXNJ Plays. Elevating your sound.</p>
            </footer>
        </div>
    );
}
