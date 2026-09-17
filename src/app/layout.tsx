import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Be the Mirror | A Change Agent's Guide to Transformation for an AI World",
  description:
    "Be the Mirror explores how leaders, change agents and organizations can navigate transformation in an AI-driven world by looking beyond technology to leadership, behaviour, trust and change.",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[color:var(--color-bg-primary)] text-[color:var(--color-fg-primary)] antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[color:var(--color-accent-cyan)] focus:px-4 focus:py-2 focus:text-[color:var(--color-bg-primary)]"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
