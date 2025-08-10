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
  title: "About Us | Easy Tool Space – Free Online Tools for Everyday Needs",
  description:
    "Learn more about Easy Tool Space — your one-stop hub for free online tools like image-to-text, merge PDFs, SQL command builder, and more. Discover our mission, story, and why millions trust us for fast, secure, and easy-to-use web utilities.",
  keywords: [
    "about Easy Tool Space",
    "free online tools",
    "image to text converter",
    "merge PDF online",
    "text to speech free",
    "SQL command generator",
    "unit converter online",
    "easy tool space mission",
    "best free productivity tools",
    "online utilities without signup"
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
