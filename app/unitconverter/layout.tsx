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
  title: 'Unit Converter — Length & Weight',
  description: 'Convert scientific and common units of length and weight with precision. Supports SI prefixes and common imperial units.',
  keywords: ['unit converter', 'length conversion', 'weight conversion', 'SI units', 'shadcn', 'nextjs'],
  authors: [{ name: 'Rohit Verma' }],
  openGraph: {
    title: 'Unit Converter — Length & Weight',
    description: 'Convert scientific and common units of length and weight with precision.',
    url: 'https://easytoolspace.vercel.app//unitconverter', // change to your real URL
    siteName: 'Easy Tool Space',
    images: [
      {
        url: 'https://easytoolspace.vercel.app//images/unitconverter.png',
        width: 1200,
        height: 630,
        alt: 'Unit Converter — Length & Weight',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unit Converter — Length & Weight',
    description: 'Convert scientific and common units of length and weight with precision.',
    images: ['https://easytoolspace.vercel.app/images/unitconverter.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://easytoolspace.vercel.app/'), // change to your site origin
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
    },
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
