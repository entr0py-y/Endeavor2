// ═══════════════════════════════════════
// ROOT LAYOUT
// Fonts: Space Grotesk + JetBrains Mono via next/font/google
// Metadata via Next.js Metadata API
// ═══════════════════════════════════════

import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { portfolioData } from "@/data/portfolio";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: portfolioData.siteTitle,
  description: portfolioData.siteDescription,
  metadataBase: new URL("https://pushkarjha.dev"),
  openGraph: {
    title: portfolioData.siteTitle,
    description: portfolioData.siteDescription,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
