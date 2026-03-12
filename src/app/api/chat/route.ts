import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        // Get the Google Gemini API key from the environment variables
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                {
                    message: "I am currently running in offline simulation mode because the `GEMINI_API_KEY` environment variable is not set. To enable AI, please add your Google Gemini API key to your `.env` file!"
                },
                { status: 200 }
            );
        }

        const ai = new GoogleGenAI({ apiKey });

        const systemInstruction = `You are a helpful and engaging AI assistant for ANISHXNJ Plays, a premium music instrument store.
You help users buy or rent instruments, answer questions about music, and provide a premium experience.
The store offers the following:
- Instruments for sale (premium gear for pros and beginners).
- Instruments for rent (wide variety).
- A special offer: the first 30 buyers get two months of free music classes!
Keep your answers relatively short, friendly, and helpful.`;

        // Format history for the Gemini API
        const history = messages.slice(0, -1).map((msg: { sender: string; text: string }) => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        const latestMessage = messages[messages.length - 1].text;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                ...history,
                { role: "user", parts: [{ text: latestMessage }] }
            ],
            config: {
                systemInstruction: systemInstruction,
            },
        });

        const reply = response.text || "I'm sorry, I couldn't formulate a response right now.";
        return NextResponse.json({ message: reply });
    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json(
            { message: "Oops! Something went wrong while connecting to my AI brain. Please try again later." },
            { status: 500 }
        );
    }
}
