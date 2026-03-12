import Head from "next/head";
import Link from "next/link";

const blogPosts = [
    {
        id: 2,
        title: "Stratocaster vs Les Paul: Finding Your Signature Tone",
        excerpt: "The eternal debate between single-coils and humbuckers. Which one fits your next studio project?",
        image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&q=80",
        date: "Feb 24, 2026",
        category: "Guitars"
    },
    {
        id: 3,
        title: "The Ultimate Guide to Modern Acoustic Pianos",
        excerpt: "We analyze the mechanical wonders of grand and upright pianos, highlighting string resonance and hammer action.",
        image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
        date: "Feb 18, 2026",
        category: "Keys"
    },
    {
        id: 4,
        title: "Discovering the Warmth of the Mantra Acoustic",
        excerpt: "An in-depth review of the Mantra acoustic guitar's resonance, craftsmanship, and how it holds up in a studio environment.",
        image: "/images/mantra.png",
        date: "Feb 10, 2026",
        category: "Guitars"
    }
];

export default function Blog() {
    return (
        <div className="min-h-screen bg-transparent overflow-hidden px-4 md:px-8 max-w-7xl mx-auto py-20">
            <Head>
                <title>Blog | ANISHXNJ Plays</title>
            </Head>

            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                    The <span className="text-gradient">Soundboard</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                    Deep dives, technical reviews, and gear stories from professional musicians and engineers.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                {blogPosts.map((post) => (
                    <div key={post.id} className="glass rounded-3xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                        <div className="relative h-72 overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                                {post.category}
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="text-sm text-gray-500 mb-3">{post.date}</div>
                            <h2 className="text-2xl font-bold mb-4 hover:text-primary transition-colors cursor-pointer">
                                {post.title}
                            </h2>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                {post.excerpt}
                            </p>
                            <Link
                                href={`#`}
                                className="inline-flex items-center text-primary font-semibold hover:text-white transition-colors"
                            >
                                Read Article
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <button className="px-8 py-4 rounded-full glass hover:bg-white/10 transition-colors border border-white/20 text-white font-semibold">
                    Load More Articles
                </button>
            </div>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 text-center text-gray-500 glass mt-20">
                <p className="mb-4 text-xl font-bold text-white tracking-tighter">
                    ANISHXNJ <span className="text-gradient">Plays</span>
                </p>
                <p>© 2026 ANISHXNJ Plays. Elevating your sound.</p>
            </footer>
        </div>
    );
}
