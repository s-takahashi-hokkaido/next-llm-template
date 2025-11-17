import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js LLM Template",
  description: "A Next.js template optimized for LLM-driven development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
