import Head from "next/head";
import Link from "next/link";
export default function Learn() {
    return (
        <div className="min-h-screen bg-transparent overflow-hidden px-4 md:px-8 max-w-7xl mx-auto py-20">
            <Head>
                <title>Learn From Us | ANISHXNJ Plays</title>
            </Head>

            {/* Header Section */}
            <div className="text-center mb-16 pt-12 md:pt-16 lg:pt-20">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                    Master Your <span className="text-gradient">Craft</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                    Join our expert-led sessions designed for aspiring musicians and seasoned professionals. Dive deep into music theory, production skills, and instrument mastery.
                </p>
            </div>

            {/* Course Offerings Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                {/* Individual Classes */}
                <div className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"
                            alt="1-on-1 Lessons"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-6 left-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Private 1-on-1 Lessons</h3>
                            <p className="text-primary font-semibold">In-person & Online</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-400 mb-6 line-clamp-3">
                            Work directly with industry veterans tailored specifically to your goals. Whether you want to nail a specific solo or learn fingerstyle basics, our tutors are here for you.
                        </p>
                        <Link href="/book-trial" className="block text-center w-full py-3 rounded-xl glass hover:bg-white/10 text-white font-medium transition-colors border border-white/20">
                            Book a Trial Session
                        </Link>
                    </div>
                </div>

                {/* Masterclasses */}
                <div className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&q=80"
                            alt="Music Production Masterclass"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-6 left-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Production Masterclass</h3>
                            <p className="text-primary font-semibold">Cohort Based</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-400 mb-6 line-clamp-3">
                            A rigorous 8-week boot camp that takes your bedroom demos and transforms them into radio-ready hits. Learn mixing, mastering, and the secrets of modern sound design.
                        </p>
                        <Link href="/waitlist" className="block text-center w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)] border border-transparent">
                            Join the Waitlist
                        </Link>
                    </div>
                </div>
            </div>

            {/* Testimonials or Stats Section */}
            <div className="py-16 px-8 rounded-3xl glass border border-white/10 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

                <h2 className="text-3xl font-bold mb-12 relative z-10">Why Learn With Us?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10">
                    <div>
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 mb-2">50+</div>
                        <div className="text-gray-400 font-medium tracking-wider uppercase text-sm">Expert Tutors</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 mb-2">10k+</div>
                        <div className="text-gray-400 font-medium tracking-wider uppercase text-sm">Students Taught</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 mb-2">100%</div>
                        <div className="text-gray-400 font-medium tracking-wider uppercase text-sm">Passion</div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 text-center text-gray-500 glass mt-24">
                <p className="mb-4 text-xl font-bold text-white tracking-tighter">
                    ANISHXNJ <span className="text-gradient">Plays</span>
                </p>
                <p>© 2026 ANISHXNJ Plays. Elevating your sound.</p>
            </footer>
        </div>
    );
}
