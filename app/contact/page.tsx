'use client'
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, ExternalLink, Copy } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const siteEmail = "myonlineworking5548@gmail.com";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Open the user's mail client with a pre-filled email. This avoids backend setup
    const mailto = `mailto:${siteEmail}?subject=${encodeURIComponent(
      subject || `Contact from ${name || "website"}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;
    window.location.href = mailto;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // fallback: select text prompt
      alert(siteEmail);
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Contact — Easy Tool Space</h1>
        <p className="mt-2 text-sm max-w-2xl">
          Got a bug report, partnership idea, or feedback? Send a message and I will
          get back to you. Prefer email? Use the address below or click the copy
          button.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
            <CardDescription>Quick — I will reply as soon as I can.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Your name</Label>
                <Input
                  id="name"
                  placeholder="Rohit Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Your email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Quick question about Easy Tool Space"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me what happened or what you'd like..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  required
                />
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit">Send message</Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                  }}
                >
                  Reset
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                This form opens your email client (mailto:) so no backend is
                required. If you want server-side handling (to keep messages in a
                database or send confirmation emails), I can add an API route.
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact info</CardTitle>
              <CardDescription>Quick links and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href={`mailto:${siteEmail}`}
                      className="text-sm underline-offset-2 hover:underline"
                    >
                      {siteEmail}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={copyEmail}>
                    <Copy className="mr-2 h-4 w-4" /> {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <p className="font-medium">Source & social</p>
                <p className="text-sm mt-1">
                  Visit the site or open an external link. Add your social links
                  here (GitHub, LinkedIn, Twitter) if you want them visible.
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <a
                    href="https://easytoolspace.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm underline-offset-2 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" /> Visit Easy Tool Space
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need a different flow?</CardTitle>
              <CardDescription>
                I can wire this to an API (Next.js / Next API route) so messages are
                stored and you can reply from an admin panel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Save messages to MongoDB / Supabase / Postgres</li>
                <li>Send confirmation email to the sender</li>
                <li>Protect form with reCAPTCHA or hCaptcha</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="mt-8 text-sm text-center">
        <p>
          Built for <span className="font-medium">Easy Tool Space</span>. Want any
          changes — layout, fields, or a backend integration — tell me and I will
          update it.
        </p>
      </footer>
    </main>
  );
}
