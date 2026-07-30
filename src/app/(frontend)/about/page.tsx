import FilmGrain from "@/components/FilmGrain";
import AboutSection from "@/components/AboutSection";
import { getPayloadClient } from "@/lib/payload";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — PASAJERO STUDIO",
  description:
    "Pasajero Studio is a creative studio and lab at the intersection of cinema, visual art, and artificial intelligence.",
};

export default async function AboutPage() {
  const payload = await getPayloadClient();
  const global = await payload.findGlobal({ slug: "about-section" });

  return (
    <main id="main-content" className="relative pt-24">
      <AboutSection
        sectionTitle={global.sectionTitle}
        sectionNumber={global.sectionNumber}
        statement={(global.statement ?? []).map((s) => s.line)}
        bio={(global.bio ?? []).map((b) => b.paragraph)}
        principles={(global.principles ?? []).map((p) => ({
          number: p.number,
          title: p.title,
          description: p.description,
        }))}
      />
      <FilmGrain />
    </main>
  );
}
