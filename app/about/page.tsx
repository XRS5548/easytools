import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">About Easy Tool Space</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Easy Tool Space is your one-stop hub for free, fast, and reliable online
          tools — designed to save you time, boost your productivity, and make
          everyday digital tasks effortless. Whether you need to convert, merge,
          generate, or analyze — we have you covered.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
          <CardDescription>Why Easy Tool Space exists</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6">
          <p>
            In today’s fast-paced digital world, small tasks can easily eat up your
            time — finding the right tool, installing software, or dealing with
            complex interfaces. We believe that the right tools should be simple,
            accessible, and available to everyone — no downloads, no sign-ups, no
            hidden fees.
          </p>
          <p>
            Easy Tool Space is built with a single focus: to make your life easier
            with an ever-growing collection of utilities that work directly in your
            browser. From image-to-text conversions to SQL command builders, from
            merging PDFs to generating QR codes, our goal is to provide tools that
            are not just functional, but delightful to use.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What We Offer</CardTitle>
          <CardDescription>Tools you can trust</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2 text-sm leading-6">
            <li><strong>Image to Text:</strong> Extract text from images with AI-powered accuracy.</li>
            <li><strong>Merge PDFs:</strong> Combine multiple PDF files into one, instantly.</li>
            <li><strong>Text to Speech:</strong> Convert written content into realistic voice output.</li>
            <li><strong>SQL Command Builder:</strong> Generate SQL queries without writing code.</li>
            <li><strong>Unit Converters:</strong> Convert lengths, weights, and more effortlessly.</li>
            <li><strong>More Tools Every Month:</strong> We continuously add new utilities based on user feedback.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Our Story</CardTitle>
          <CardDescription>From idea to reality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6">
          <p>
            Easy Tool Space started as a small side project by Rohit Verma, a B.Tech
            student passionate about web development and creating tools that solve
            everyday problems. The vision was simple: build a clean, modern, and
            ad-supported platform that offers essential tools for free — without the
            bloat.
          </p>
          <p>
            Over time, it has grown into a comprehensive toolkit trusted by users
            around the world. Our commitment to speed, privacy, and user-friendly
            design has been the backbone of our success.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why Choose Us?</CardTitle>
          <CardDescription>The Easy Tool Space difference</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2 text-sm leading-6">
            <li>No sign-up or installation required — just open and use.</li>
            <li>Completely free with minimal, non-intrusive ads.</li>
            <li>Regular updates and new features driven by community feedback.</li>
            <li>Fast, secure, and privacy-focused — your data stays yours.</li>
            <li>Beautiful, responsive UI built with modern web technologies.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connect With Us</CardTitle>
          <CardDescription>We’d love to hear from you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6">
          <p>
            Got an idea for a new tool? Found a bug? Want to collaborate? Reach out
            via our contact page or send us an email. Your suggestions help shape
            the future of Easy Tool Space.
          </p>
          <p>Email: <a href="mailto:myonlineworking5548@gmail.com" className="underline">myonlineworking5548@gmail.com</a></p>
          <p>
            Website: <a href="https://easytoolspace.vercel.app" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline">
              easytoolspace.vercel.app <ExternalLink className="h-4 w-4" />
            </a>
          </p>
        </CardContent>
      </Card>

      <Separator />

      <footer className="text-sm text-center text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Easy Tool Space — Built with ❤️ by Rohit
          Verma. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
