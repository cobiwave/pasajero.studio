import FilmGrain from "@/components/FilmGrain";
import AboutSection from "@/components/AboutSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — PASAJERO STUDIO",
  description:
    "Pasajero Studio is a creative studio and lab at the intersection of cinema, visual art, and artificial intelligence.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="relative pt-24">
      <AboutSection />
      <FilmGrain />
    </main>
  );
}
