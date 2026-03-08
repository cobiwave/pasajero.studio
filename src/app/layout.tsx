import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "JM — Frontend Engineer",
  description:
    "Portfolio of Jacobo Martínez, a frontend engineer specializing in React, Next.js, and AI Agent architectures.",
  metadataBase: new URL("https://jacobomartinez.dev"),
  openGraph: {
    title: "JM — Frontend Engineer",
    description:
      "Building high-performance web experiences for global brands. Specialist in React, Next.js & AI Agent architectures.",
    url: "https://jacobomartinez.dev",
    siteName: "Jacobo Martínez",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JM — Frontend Engineer",
    description:
      "Building high-performance web experiences for global brands. Specialist in React, Next.js & AI Agent architectures.",
    creator: "@pasajero-studio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jacobo Martínez",
  url: "https://jacobomartinez.dev",
  jobTitle: "Senior Frontend Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Amazon Web Services",
  },
  sameAs: [
    "https://github.com/pasajero-studio",
    "https://linkedin.com/in/pasajero-studio",
    "https://x.com/pasajero-studio",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "GSAP",
    "Design Systems",
    "AI Agent Architectures",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
