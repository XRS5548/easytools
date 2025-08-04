"use client";

import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-16 px-4 md:px-8 py-8 bg-muted/40">
      <Separator className="mb-6" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <div>&copy; {new Date().getFullYear()} Easy Tool Space. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/privacy-policy" className="hover:underline">
            Privacy
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
