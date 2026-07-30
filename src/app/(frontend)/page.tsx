import FilmGrain from "@/components/FilmGrain";
import LoadingGate from "@/components/LoadingGate";
import { getPayloadClient } from "@/lib/payload";

export default async function Home() {
  const payload = await getPayloadClient();

  const [loader, hero, contactSection] = await Promise.all([
    payload.findGlobal({ slug: "loader" }),
    payload.findGlobal({ slug: "hero" }),
    payload.findGlobal({ slug: "contact-section" }),
  ]);

  return (
    <main id="main-content" className="relative">
      <LoadingGate
        words={(loader.words ?? []).map((w) => w.word)}
        subtitle={hero.subtitle}
        socials={(contactSection.socials ?? []).map((s) => ({ label: s.label, href: s.href }))}
      />
      <FilmGrain />
    </main>
  );
}
