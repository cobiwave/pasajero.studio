import WorkSection, { type WorkProject } from "@/components/WorkSection";
import { getPayloadClient } from "@/lib/payload";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — PASAJERO STUDIO",
  description:
    "Original short films and visual art by Pasajero Studio. Cinematic storytelling through narrative, documentary, and experimental formats.",
};

export default async function WorkPage() {
  const payload = await getPayloadClient();

  const [global, { docs: films }] = await Promise.all([
    payload.findGlobal({ slug: "work-section" }),
    payload.find({
      collection: "films",
      where: { status: { equals: "published" } },
      sort: "order",
      depth: 1,
      limit: 100,
    }),
  ]);

  const projects: WorkProject[] = films.map((film) => ({
    id: film.id,
    title: film.title,
    category: film.category,
    year: film.year,
    description: film.description,
    tags: (film.tags ?? []).map((t) => t.tag),
    href: film.videoUrl ?? undefined,
    media:
      film.thumbnail && typeof film.thumbnail === "object" && film.thumbnail.url
        ? { url: film.thumbnail.url, mimeType: film.thumbnail.mimeType ?? undefined }
        : undefined,
  }));

  return (
    <main id="main-content" className="relative pt-24">
      <WorkSection
        sectionTitle={global.sectionTitle}
        sectionNumber={global.sectionNumber}
        headline={(global.headline ?? []).map((h) => h.line)}
        projects={projects}
      />
    </main>
  );
}
