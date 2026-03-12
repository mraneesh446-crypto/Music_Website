"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
    id: number;
    text: string;
    sender: "bot" | "user";
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hi there! I'm your virtual assistant. How can I help you with our musical instruments today?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { id: Date.now(), text: input, sender: "user" };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            const data = await response.json();

            const botResponse: Message = {
                id: Date.now() + 1,
                text: data.message || "I couldn't process that right now.",
                sender: "bot"
            };

            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [...prev, { id: Date.now() + 1, text: "Connection error. Please try again.", sender: "bot" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {/* Chat Window */}
            <div
                className={`mb-4 w-[calc(100vw-3rem)] sm:w-80 h-[450px] bg-[#111] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 pointer-events-none translate-y-10 absolute bottom-16 right-0"}`}
            >
                {/* Header */}
                <div className="bg-primary p-4 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">ANISHXNJ Bot</h3>
                            <div className="text-[11px] text-white/80 flex items-center gap-1.5 mt-0.5">
                                <span className="w-2 h-2 rounded-full bg-green-400 relative">
                                    <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
                                </span>
                                Online
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-1.5 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] scroll-smooth">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${msg.sender === "user" ? "bg-primary text-white self-end rounded-tr-sm" : "bg-[#222] text-gray-200 self-start rounded-tl-sm border border-white/5"}`}>
                            {msg.text}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm bg-[#222] text-gray-200 self-start rounded-tl-sm border border-white/5 flex gap-1 items-center h-10 w-16">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 bg-[#111] border-t border-white/10 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-500"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                    </button>
                </div>
            </div>

            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:bg-primary-dark hover:scale-105 transition-all duration-300 ${isOpen ? "rotate-90 scale-0 opacity-0 absolute" : "rotate-0 scale-100 opacity-100 relative"}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
            </button>
        </div>
    );
}
