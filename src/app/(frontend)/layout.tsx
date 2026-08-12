import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import { getPayloadClient } from "@/lib/payload";
import "./globals.scss";

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
  title: "PASAJERO STUDIO — Estudio de producción audiovisual y directorio de artistas",
  description:
    "Estudio de contenido audiovisual y directorio invitacional de artistas multidisciplinarios —skate, surf, música, cine, fotografía— con base en Buenos Aires.",
  metadataBase: new URL("https://pasajero.studio"),
  openGraph: {
    title: "PASAJERO STUDIO",
    description:
      "Estudio de contenido audiovisual y directorio invitacional de artistas multidisciplinarios con base en Buenos Aires.",
    url: "https://pasajero.studio",
    siteName: "PASAJERO STUDIO",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PASAJERO STUDIO",
    description:
      "Estudio de contenido audiovisual y directorio invitacional de artistas multidisciplinarios con base en Buenos Aires.",
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
    "Estudio de contenido audiovisual (films, entrevistas, podcast) y directorio invitacional de artistas multidisciplinarios del nicho skate, surf, música, cine y fotografía, con base en Buenos Aires.",
  sameAs: [
    "https://github.com/pasajero-studio",
    "https://linkedin.com/in/pasajero-studio",
    "https://x.com/pasajero-studio",
  ],
  knowsAbout: [
    "Producción audiovisual",
    "Contenido editorial",
    "Directorio de artistas",
    "Fotografía",
    "Cine",
    "Cultura skate y surf",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getPayloadClient();

  const [nav, siteSettings, contactSection] = await Promise.all([
    payload.findGlobal({ slug: "nav" }),
    payload.findGlobal({ slug: "site-settings" }),
    payload.findGlobal({ slug: "contact-section" }),
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
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable}`}
      >
        <Navbar
          items={nav.items ?? []}
          contactEmail={siteSettings.contactEmail}
          socials={(contactSection.socials ?? []).map((s) => ({
            label: s.label,
            href: s.href,
          }))}
        />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
