import FilmGrain from "@/components/FilmGrain";
import LabSection from "@/components/LabSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab — PASAJERO STUDIO",
  description:
    "AI-powered tools for filmmakers and colorists. Intelligent PowerGrade generation for DaVinci Resolve — coming soon.",
};

export default function LabPage() {
  return (
    <main id="main-content" className="relative">
      <LabSection />
      <FilmGrain />
    </main>
  );
}
