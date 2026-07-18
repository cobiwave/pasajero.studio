import FilmGrain from "@/components/FilmGrain";
import WorkSection from "@/components/WorkSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — PASAJERO STUDIO",
  description:
    "Original short films and visual art by Pasajero Studio. Cinematic storytelling through narrative, documentary, and experimental formats.",
};

export default function WorkPage() {
  return (
    <main id="main-content" className="relative pt-24">
      <WorkSection />
      <FilmGrain />
    </main>
  );
}
