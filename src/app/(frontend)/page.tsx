import LoadingGate from "@/components/LoadingGate";
import { getPayloadClient } from "@/lib/payload";

export default async function Home() {
  const payload = await getPayloadClient();

  const [loader, hero] = await Promise.all([
    payload.findGlobal({ slug: "loader" }),
    payload.findGlobal({ slug: "hero" }),
  ]);

  return (
    <main id="main-content">
      <LoadingGate
        words={(loader.words ?? []).map((w) => w.word)}
        subtitle={hero.subtitle}
      />
    </main>
  );
}
