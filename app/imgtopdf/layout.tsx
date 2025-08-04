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
  title: "Free Online Image to PDF Converter - Easy Tool Space",
  description:
    "Convert JPG, PNG, and other image formats to PDF instantly with our free, secure, and easy-to-use image to PDF converter. No signup or software needed.",
  keywords: [
    "image to pdf",
    "convert jpg to pdf",
    "png to pdf converter",
    "free image to pdf tool",
    "online photo to pdf",
    "image to pdf viewer",
    "easy tool space",
    "browser image to pdf",
    "create pdf from images",
    "merge images to pdf"
  ],
  openGraph: {
    title: "Free Online Image to PDF Converter - Easy Tool Space",
    description:
      "Quickly turn images into PDF files online. 100% free, secure, and works in your browser without uploading.",
    url: "https://easytoolspace.vercel.app/imgtopdf",
    siteName: "Easy Tool Space",
    type: "website",
    images: [
      {
        url: "https://easytoolspace.vercel.app/images/imgtopdf.png", // Change to your OG image URL
        width: 1200,
        height: 630,
        alt: "Convert Image to PDF Tool - Easy Tool Space",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Image to PDF Converter",
    description:
      "Turn JPG, PNG, and more into a single PDF file with no downloads or registration.",
    images: ["https://easytoolspace.vercel.app/images/imgtopdf.png"], // Same as OG image
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
