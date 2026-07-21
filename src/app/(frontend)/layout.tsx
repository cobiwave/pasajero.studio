import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import { getPayloadClient } from "@/lib/payload";
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
  title: "PASAJERO STUDIO — AI Tools for Filmmakers",
  description:
    "Multidisciplinary digital production agency building AI-powered tools for filmmakers, colorists, and video editors. AI LUT & PowerGrade generation for DaVinci Resolve.",
  metadataBase: new URL("https://pasajero.studio"),
  openGraph: {
    title: "PASAJERO STUDIO — AI Tools for Filmmakers",
    description:
      "AI-powered tools for the audiovisual industry. LUT & PowerGrade generation for DaVinci Resolve. Coming soon.",
    url: "https://pasajero.studio",
    siteName: "PASAJERO STUDIO",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PASAJERO STUDIO — AI Tools for Filmmakers",
    description:
      "AI-powered tools for the audiovisual industry. LUT & PowerGrade generation for DaVinci Resolve. Coming soon.",
    creator: "@pasajero_studio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PASAJERO STUDIO",
  url: "https://pasajero.studio",
  description:
    "Multidisciplinary digital production agency building AI-powered SaaS tools for filmmakers, colorists, and video editors.",
  sameAs: [
    "https://github.com/pasajero-studio",
    "https://linkedin.com/in/pasajero-studio",
    "https://x.com/pasajero-studio",
  ],
  knowsAbout: [
    "AI Color Grading",
    "LUT Generation",
    "PowerGrade Generation",
    "DaVinci Resolve",
    "Film Post-Production",
    "SaaS for Filmmakers",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getPayloadClient();

  const [nav, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: "nav" }),
    payload.findGlobal({ slug: "site-settings" }),
  ]);

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
        <Navbar items={nav.items ?? []} contactEmail={siteSettings.contactEmail} />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
