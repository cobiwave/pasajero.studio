import FilmGrain from "@/components/FilmGrain";
import DirectorySection from "@/components/DirectorySection";
import JoinSection from "@/components/JoinSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directory — PASAJERO STUDIO",
  description:
    "A curated, invitational directory of skate, surf, music, film, and photography artists from Buenos Aires.",
};

export default function DirectoryPage() {
  return (
    <main id="main-content" className="relative pt-24">
      <DirectorySection />
      <JoinSection />
      <FilmGrain />
    </main>
  );
}
