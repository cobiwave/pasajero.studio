import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import FilmGrain from "@/components/FilmGrain";
import LoadingGate from "@/components/LoadingGate";

const WorkSection = dynamic(() => import("@/components/WorkSection"), {
  ssr: true,
});
const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  ssr: true,
});
const ExperienceSection = dynamic(
  () => import("@/components/ExperienceSection"),
  { ssr: true }
);
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  ssr: true,
});

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <LoadingGate />
      <FilmGrain />
      <Navbar />
      <WorkSection />
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
