"use client";

import Head from "next/head";
import { useState } from "react";

interface Genre {
    name: string;
    icon: string;
    desc: string;
    expandedDesc: string;
}

const allGenres: Genre[] = [
    { name: "Pop", icon: "🎤", desc: "Catchy melodies and chart-topping hits.", expandedDesc: "Pop music features driving rhythms, catchy melodic hooks, and verse-chorus structures. We stock the finest vocal mics, dynamic processing tools, and synths favored by today's leading pop producers." },
    { name: "Rock & Metal", icon: "🎸", desc: "Heavy distortions and intense energy.", expandedDesc: "Built on amplified instrumentation, particularly electric guitars, bass, and drums. Explore our collection of high-gain amplifiers, distortion pedals, and robust drum hardware designed to withstand intense playing." },
    { name: "Hip-Hop & Rap", icon: "🎧", desc: "Rhythmic speech and booming beats.", expandedDesc: "Rooted in rhythmic vocal delivery over backing drum beats and samples. We offer premier DJ controllers, drum machines, samplers, and studio monitors that deliver pristine low-end frequencies." },
    { name: "Electronic & EDM", icon: "🎹", desc: "Synthesizers and digital rhythms.", expandedDesc: "Created largely with electronic instruments like synthesizers and drum machines. Discover our vast array of analog synths, MIDI controllers, and outboard effects processors to sound design the future." },
    { name: "Jazz & Blues", icon: "🎷", desc: "Soulful rhythms and smooth melodies.", expandedDesc: "Known for complex harmonies, improvisation, and expressive rhythms. Find your voice with our premium selection of hollow-body guitars, vintage tube amps, brass, and woodwind instruments." },
    { name: "Classical & Opera", icon: "🎻", desc: "Orchestral arrangements and pure strings.", expandedDesc: "Rooted in Western traditions, featuring orchestral ensembles and complex compositions. We cater to the highest standards with concert-grade violins, cellos, grand pianos, and meticulously crafted bows." },
    { name: "R&B & Soul", icon: "🤎", desc: "Emotional vocals and deep grooves.", expandedDesc: "Combining rhythm and blues with gospel and soul influences. Capture that emotional warmth with our selection of vintage keyboards, ribbon microphones, and classic analog preamps." },
    { name: "Country", icon: "🤠", desc: "Storytelling with twangy acoustic sounds.", expandedDesc: "Originating in the rural southern US, characterized by string instruments and storytelling. Browse our extensive range of acoustic guitars, pedal steel guitars, banjos, and mandolins." },
    { name: "Reggae", icon: "🇯🇲", desc: "Laid-back rhythms and heavy basslines.", expandedDesc: "Defined by its offbeat rhythms and prominent, melodic basslines. Lay down the groove with our specialized dub effects, spring reverbs, and deep-sounding bass guitars." },
    { name: "Latin & Salsa", icon: "💃", desc: "Passionate rhythms and vibrant dancing.", expandedDesc: "A diverse genre spanning many regional styles, defined by complex percussion and upbeat tempos. We carry top-tier congas, timbales, acoustic guitars, and specialized percussion instruments." },
    { name: "Folk & Acoustic", icon: "🪕", desc: "Traditional sounds and storytelling.", expandedDesc: "A traditional acoustic genre focused on vocals and simple accompaniments. We offer an impressive gallery of boutique acoustic guitars, ukuleles, and folk instruments for authentic tones." },
    { name: "Afrobeat", icon: "🌍", desc: "Complex rhythms and infectious grooves.", expandedDesc: "Fusing complex polyrhythms, jazz, funk, and highlife. Power your ensembles with our world-class percussion sets, bright brass instruments, and rhythm-heavy electric guitars." },
    { name: "K-Pop & J-Pop", icon: "✨", desc: "High-energy pop with synchronized dancing.", expandedDesc: "Known for meticulous production, genre-blending, and immense global popularity. Equip your studio with the modern digital workstations, virtual instruments, and pristine vocal chains required for these genres." },
    { name: "Punk", icon: "🛹", desc: "Fast, loud, and rebellious energy.", expandedDesc: "Characterized by short, fast-paced songs with stripped-down instrumentation. Get raw and loud with our durable electric guitars, punchy bass amps, and sturdy drum kits." },
    { name: "Funk & Disco", icon: "🪩", desc: "Danceable beats and groovy basslines.", expandedDesc: "Dance music that brought rhythm and bass to the forefront. Enhance your groove with our envelope filters, slap-ready bass guitars, and pristine brass section setups." },
    { name: "Ambient & Lo-Fi", icon: "☕", desc: "Relaxing atmospheric and chilled beats.", expandedDesc: "Focuses on atmosphere and texture over traditional musical structure. Craft meditative soundscapes with our pedalboards, tape echoes, granular synthesizers, and lo-fi samplers." },
    { name: "Gospel", icon: "🙌", desc: "Spiritual and uplifting vocal harmonies.", expandedDesc: "Featuring dominant vocals, strong use of harmony, and Christian lyrics. We supply the soaring organs, stage-ready drums, and high-clarity microphones needed for worship and gospel settings." },
    { name: "World Traditional", icon: "🪘", desc: "Cultural sounds from around the globe.", expandedDesc: "Music indigenous to various global cultures, utilizing unique regional instruments. Explore our hand-picked selection of authentic global instruments like sitars, kalimbas, and taiko drums." },
    { name: "Techno & House", icon: "🎛️", desc: "Repetitive beats for the underground club.", expandedDesc: "Electronic dance music focused on 4/4 beats and repetitive rhythms. Build your live rig with our professional DJ mixers, step sequencers, and thunderous PA systems." },
    { name: "Trance", icon: "🌌", desc: "Hypnotic melodies and euphoric synth lines.", expandedDesc: "Known for tempos between 125 and 150 BPM, repeating melodic phrases, and musical tension. Elevate your tracks with our wide array of digital software and hardware synths perfect for lush pads." },
    { name: "Dubstep", icon: "🔊", desc: "Heavy bass drops and aggressive synth growls.", expandedDesc: "Originating in South London, marked by syncopated drum patterns and prominent sub-bass frequencies. We provide the bass-heavy monitoring systems and digital tools needed to sculpt the perfect wobble." },
    { name: "Grunge", icon: "🎸", desc: "Raw, angsty rock with distorted guitars.", expandedDesc: "An alt-rock subgenre that emerged from Seattle, known for sludgy guitar sounds. Recreate the 90s aesthetic with our classic fuzz pedals, offset guitars, and heavy drum cymbals." },
    { name: "Reggaeton", icon: "🔥", desc: "Urban beats originating from Latin America.", expandedDesc: "Blending Jamaican dancehall with Latin American hip hop. Dial in the definitive Dembow rhythm with our specialized drum libraries and Latin percussion tools." },
    { name: "Flamenco", icon: "💃", desc: "Passionate Spanish acoustic guitar.", expandedDesc: "A highly expressive Spanish musical style with virtuosic guitar playing. Find the perfect nylon string guitar, castanets, and cajons from our imported acoustic selection." },
    { name: "Bossa Nova", icon: "🌴", desc: "Smooth Brazilian jazz and samba blend.", expandedDesc: "A relaxed style of samba developed in Brazil. Achieve that breezy tropical sound with our classical nylon string guitars, soft shakers, and warm bass tones." }
];

export default function About() {
    const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [feedbackForm, setFeedbackForm] = useState({ name: "", email: "", message: "" });

    const faqs = [
        { q: "Do you ship internationally?", a: "Currently, we only ship within Nepal to ensure the highest quality of service and instrument safety, but we plan to expand soon!" },
        { q: "How does the rental process work?", a: "Simply add the rental item to your cart, specify the duration during checkout, and we will deliver it to your studio or venue. You must provide a valid ID and a security deposit." },
        { q: "Can I try an instrument before buying?", a: "Yes! You can book a trial session at our physical location. Check our 'Book Trial' page for more details." },
        { q: "Do you offer financing or EMI?", a: "Yes, we partner with major banks to provide 0% EMI options for credit card holders on purchases above NPR 50,000." },
    ];

    const toggleFaq = (index: number) => {
        if (faqOpen === index) {
            setFaqOpen(null);
        } else {
            setFaqOpen(index);
        }
    };

    const handleFeedback = (e: React.FormEvent) => {
        e.preventDefault();
        setFeedbackStatus("submitting");
        setTimeout(() => {
            setFeedbackStatus("success");
            setFeedbackForm({ name: "", email: "", message: "" });
            setTimeout(() => setFeedbackStatus("idle"), 5000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-transparent overflow-hidden px-4 md:px-8 max-w-7xl mx-auto py-20 pt-32 relative">
            <Head>
                <title>About Us & Feedback | ANISHXNJ Plays</title>
            </Head>

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full z-[-1] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full z-[-1] pointer-events-none"></div>

            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                    Our <span className="text-gradient">Story</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                    We are passionate musicians bridging the gap between world-class gear and the next generation of sound innovators.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                <div className="glass rounded-3xl p-8 relative overflow-hidden group border border-white/10 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <h2 className="text-3xl font-bold mb-4">Dedicated to Excellence</h2>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                        Founded in 2026, ANISHXNJ Plays began with a simple mission: to provide recording studios, touring professionals, and bedroom producers with uncompromising access to the world&apos;s most desired instruments.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                        Our team consists of audio engineers, luthiers, and synth-enthusiasts. Every single instrument in our catalog goes through a rigorous inspection process to guarantee optimal tonal quality and playability.
                    </p>
                </div>
                <div className="relative h-96 rounded-3xl overflow-hidden glass p-2 hover:scale-[1.02] transition-transform duration-500 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                    <img
                        src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"
                        alt="Recording Studio"
                        className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>
            </div>

            {/* Music Genres Section */}
            <div className="text-center mb-24">
                <div className="mb-12">
                    <h2 className="text-4xl font-black mb-4">Genres We <span className="text-gradient">Cater To</span></h2>
                    <p className="text-gray-400">Whatever your sound, we have the gear to bring your vision to life.</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {allGenres.map((genre, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedGenre(genre)}
                            className="glass border border-white/10 p-6 rounded-2xl hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 flex flex-col items-center text-center cursor-pointer group"
                        >
                            <div className="text-5xl mb-4 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{genre.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-white">{genre.name}</h3>
                            <p className="text-sm text-gray-400">{genre.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center mb-24">
                <h2 className="text-3xl font-bold mb-12">Why Choose ANISHXNJ Plays?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Curated Selection", desc: "Only the gold-standard equipment cuts." },
                        { title: "Flexible Rentals", desc: "Borrow world-class gear for your immediate studio sessions." },
                        { title: "Expert Support", desc: "24/7 technical and tonal advice from real musicians." }
                    ].map((feature, idx) => (
                        <div key={idx} className="glass border border-white/10 p-8 rounded-2xl hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300">
                            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                            <p className="text-gray-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Q&A Section */}
            <div className="max-w-4xl mx-auto mb-24">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black mb-4">Frequently Asked <span className="text-gradient">Questions</span></h2>
                    <p className="text-gray-400">Everything you need to know about purchasing and renting.</p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="glass border border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => toggleFaq(idx)}
                                className="w-full p-6 text-left flex justify-between items-center focus:outline-none hover:bg-white/5 transition-colors"
                            >
                                <span className="text-lg font-bold text-white pr-8">{faq.q}</span>
                                <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${faqOpen === idx ? 'rotate-180 bg-primary text-white' : 'text-gray-400'}`}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"></path></svg>
                                </div>
                            </button>
                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${faqOpen === idx ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-gray-400 leading-relaxed border-t border-white/10 pt-4 mt-2">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Feedback Form Section */}
            <div className="max-w-3xl mx-auto mb-24 glass rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full z-[-1]"></div>

                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-black mb-4">We Value Your <span className="text-gradient">Feedback</span></h2>
                    <p className="text-gray-400">Help us improve your musical journey. Do you have any suggestions, or want to report an issue? Let us know below!</p>
                </div>

                {feedbackStatus === "success" ? (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-10 text-center animate-fade-in">
                        <div className="w-20 h-20 mx-auto bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
                        <p className="text-gray-300">Your feedback has been successfully submitted. We appreciate your insights!</p>
                    </div>
                ) : (
                    <form onSubmit={handleFeedback} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    value={feedbackForm.name}
                                    onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={feedbackForm.email}
                                    onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    placeholder="jane@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Message / Feedback</label>
                            <textarea
                                required
                                rows={5}
                                value={feedbackForm.message}
                                onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                placeholder="Tell us what you think..."
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={feedbackStatus === "submitting"}
                            className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all flex items-center justify-center gap-2 ${feedbackStatus === "submitting"
                                ? "bg-gray-600 cursor-not-allowed opacity-50"
                                : "bg-primary hover:bg-primary-dark shadow-[0_0_20px_rgba(139,92,246,0.4)] transform hover:-translate-y-1"
                                }`}
                        >
                            {feedbackStatus === "submitting" ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Submitting...
                                </>
                            ) : (
                                "Submit Feedback"
                            )}
                        </button>
                    </form>
                )}
            </div>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 text-center text-gray-500 glass mt-20 relative z-10">
                <p className="mb-4 text-xl font-bold text-white tracking-tighter">
                    ANISHXNJ <span className="text-gradient">Plays</span>
                </p>
                <p>© 2026 ANISHXNJ Plays. Elevating your sound.</p>
            </footer>
            {/* Genre Popup Modal */}
            {selectedGenre && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedGenre(null)}>
                    <div
                        className="glass border border-white/20 p-8 rounded-3xl max-w-lg w-full relative shadow-2xl transform transition-all duration-300 scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            onClick={() => setSelectedGenre(null)}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <div className="flex flex-col items-center text-center">
                            <div className="text-7xl mb-6 drop-shadow-2xl animate-bounce-slow">{selectedGenre.icon}</div>
                            <h3 className="text-3xl font-black mb-3 text-white">{selectedGenre.name}</h3>
                            <p className="text-primary font-medium mb-6">{selectedGenre.desc}</p>
                            <div className="h-px w-full bg-white/10 mb-6"></div>
                            <p className="text-gray-300 leading-relaxed text-left w-full">
                                {selectedGenre.expandedDesc}
                            </p>
                        </div>
                        <button
                            className="w-full mt-8 py-3 rounded-xl bg-primary/20 text-primary border border-primary/50 hover:bg-primary hover:text-white transition-all font-bold"
                            onClick={() => setSelectedGenre(null)}
                        >
                            Close Details
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
