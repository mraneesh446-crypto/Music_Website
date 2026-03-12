import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Chatbot from "@/components/Chatbot";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ANISHXNJ Plays | Premium Music Instruments",
  description: "Discover the perfect instrument for your next masterpiece. Buy or rent top-tier gear curated for professional musicians and passionate beginners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="pt-[74px]">
          {children}
        </main>
        <Chatbot />
      </body>
    </html>
  );
}
