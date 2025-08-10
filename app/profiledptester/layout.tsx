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
  title: "Profile DP Tester – Preview Your Profile Pictures Online | Easy Tool Space",
  description:
    "Test and preview your profile pictures for Facebook, Instagram, WhatsApp, and more before uploading. Profile DP Tester by Easy Tool Space lets you see how your DP will look on different platforms — free and online!",
  keywords: [
    "profile dp tester",
    "profile picture preview",
    "facebook dp preview",
    "instagram profile photo preview",
    "whatsapp dp tester",
    "online dp viewer",
    "profile photo size checker",
    "dp tester online",
    "easy tool space",
    "test profile picture"
  ],
  authors: [{ name: "Rohit Verma" }],
  creator: "Rohit Verma",
  publisher: "Easy Tool Space",
  metadataBase: new URL("https://easytoolspace.vercel.app"),
  alternates: {
    canonical: "https://easytoolspace.vercel.app/profile-dp-tester",
  },
  openGraph: {
    title: "Profile DP Tester – Preview Your Profile Pictures Online",
    description:
      "Check how your profile picture will appear on Facebook, Instagram, WhatsApp, and more — directly in your browser. 100% free and instant.",
    url: "https://easytoolspace.vercel.app/profile-dp-tester",
    siteName: "Easy Tool Space",
    images: [
      {
        url: "https://easytoolspace.vercel.app/images/profiledptester.png",
        width: 1200,
        height: 630,
        alt: "Profile DP Tester Preview Tool – Easy Tool Space",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Profile DP Tester – Preview Your Profile Pictures Online",
    description:
      "Preview and test your profile picture for social media before uploading — Facebook, Instagram, WhatsApp, and more.",
    images: ["https://easytoolspace.vercel.app/images/profiledptester.png"],
    creator: "@easytoolspace",
  },
  category: "Image Tools",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
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
