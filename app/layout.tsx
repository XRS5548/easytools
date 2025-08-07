import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavbarTop } from "@/components/persional/navbar";
import { Footer } from "@/components/persional/footer";
import NextTopLoader from 'nextjs-toploader';
import { Analytics } from "@vercel/analytics/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Easy Tool Space – Free Online Tools for Everyday Needs",
  description:
    "Easy Tool Space offers powerful and easy-to-use online tools including image to text, text to speech, SQL command builder, and more — all in one place. Free, fast, and accessible for everyone.",
  keywords: [
    "Easy Tool Space",
    "free online tools",
    "image to text converter",
    "text to speech",
    "SQL command builder",
    "online utilities",
    "developer tools",
    "productivity tools",
  ],
  openGraph: {
    title: "Easy Tool Space – Free Online Tools for Everyday Needs",
    description:
      "Access powerful utilities like image to text, SQL builders, and more. 100% free and user-friendly. Try Easy Tool Space today!",
    url: "https://easytoolspace.vercel.app",
    siteName: "Easy Tool Space",
    images: [
      {
        url: "https://easytoolspace.vercel.app/export.png", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Easy Tool Space OG Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Easy Tool Space – Free Online Tools",
    description:
      "Try powerful online tools like image to text, text to speech, SQL builders and more. All free at Easy Tool Space!",
    images: ["https://easytoolspace.vercel.app/export.png"], // Same OG image
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="GomtazhKgWAzvnfXrJgXseR8x0jmh5-C8Ogt68aCfkg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-9509089570774470"></meta>
        <link
          href="https://fonts.googleapis.com/css2?family=Playwrite+HU:wght@100..400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>

        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader />
          <NavbarTop />

          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
