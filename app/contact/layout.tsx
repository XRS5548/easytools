import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contact Us | Easy Tool Space – Get in Touch Today",
  description:
    "Have questions, feedback, or ideas? Contact Easy Tool Space today. Send us a message or email at myonlineworking5548@gmail.com and we’ll get back to you as soon as possible.",
  keywords: [
    "contact Easy Tool Space",
    "get in touch Easy Tool Space",
    "support Easy Tool Space",
    "feedback Easy Tool Space",
    "email Easy Tool Space",
    "easy tool space help",
    "online tools support",
    "contact page easy tool space",
    "reach Easy Tool Space",
    "report bug Easy Tool Space"
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <>
          {children}
        </>
  );
}
