import FilmGrain from "@/components/FilmGrain";
import ContactSection from "@/components/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — PASAJERO STUDIO",
  description:
    "Get in touch with Pasajero Studio, the audiovisual studio behind a curated network of skate, surf, music, film, and photography artists from Buenos Aires.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="relative pt-24">
      <ContactSection />
      <FilmGrain />
    </main>
  );
}
