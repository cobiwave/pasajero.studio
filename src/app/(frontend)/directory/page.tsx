import DirectorySection, { type DirectoryArtist } from "@/components/DirectorySection";
import JoinSection from "@/components/JoinSection";
import { getPayloadClient } from "@/lib/payload";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directory — PASAJERO STUDIO",
  description:
    "A curated, invitational directory of skate, surf, music, film, and photography artists from Buenos Aires.",
};

export default async function DirectoryPage() {
  const payload = await getPayloadClient();

  const [global, { docs: artists }, { docs: disciplines }] = await Promise.all([
    payload.findGlobal({ slug: "directory-section" }),
    payload.find({
      collection: "artists",
      where: { status: { equals: "approved" } },
      sort: "order",
      depth: 1,
      limit: 100,
    }),
    payload.find({
      collection: "disciplines",
      where: { active: { equals: true } },
      sort: "name",
      limit: 100,
    }),
  ]);

  const directoryArtists: DirectoryArtist[] = artists.map((artist) => ({
    id: artist.id,
    name: artist.name,
    disciplines: artist.disciplines
      .map((discipline) => (typeof discipline === "object" ? discipline.name : null))
      .filter((name): name is string => Boolean(name)),
    location: artist.location,
    bio: artist.bio,
    media:
      artist.avatar && typeof artist.avatar === "object" && artist.avatar.url
        ? { url: artist.avatar.url, mimeType: artist.avatar.mimeType ?? undefined }
        : undefined,
    contactHref: artist.contactHref,
    featured: artist.featured ?? false,
  }));

  return (
    <main id="main-content" className="relative pt-24">
      <DirectorySection
        sectionTitle={global.sectionTitle}
        sectionNumber={global.sectionNumber}
        headline={(global.headline ?? []).map((h) => h.line)}
        intro={global.intro}
        artists={directoryArtists}
      />
      <JoinSection
        sectionTitle={global.joinForm.sectionTitle}
        sectionNumber={global.joinForm.sectionNumber}
        headline={(global.joinForm.headline ?? []).map((h) => h.line)}
        intro={global.joinForm.intro}
        disciplines={disciplines.map((d) => d.name)}
        form={global.joinForm.form}
      />
    </main>
  );
}
