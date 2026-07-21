/**
 * Seed de producción: taxonomía real de Disciplines, los 4 Films existentes
 * y el contenido editorial de los Globals, migrado desde content.json.
 * No crea ningún Artist — el directorio arranca vacío (alta manual vía
 * ArtistApplications, ver plan de colecciones).
 *
 * Requiere src/payload.config.ts + collections/globals ya creados.
 * Correr con: pnpm seed:prod
 */
import { getPayload } from "payload";
import config from "@/payload.config";
import content from "@/lib/content";

const DISCIPLINES: Array<{
  name: string;
  group: "Skate" | "Surf" | "Música" | "Cine" | "Foto";
}> = [
  { name: "Skater", group: "Skate" },
  { name: "Surfista", group: "Surf" },
  { name: "Shaper", group: "Surf" },
  { name: "Músico", group: "Música" },
  { name: "Filmmaker", group: "Cine" },
  { name: "Fotógrafo", group: "Foto" },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const toLines = (lines: string[]) => lines.map((line) => ({ line }));

async function fetchAsMediaFile(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo descargar ${url}: ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  return {
    data: Buffer.from(arrayBuffer),
    mimetype: res.headers.get("content-type") || "image/jpeg",
    name: url.split("/").pop() || "thumbnail.jpg",
    size: arrayBuffer.byteLength,
  };
}

async function run() {
  const payload = await getPayload({ config });

  // ── Disciplines: taxonomía real, oficios finos + group de marketing ──────
  const { totalDocs: disciplineCount } = await payload.count({ collection: "disciplines" });

  if (disciplineCount === 0) {
    for (const d of DISCIPLINES) {
      await payload.create({
        collection: "disciplines",
        data: { name: d.name, slug: slugify(d.name), group: d.group, active: true },
      });
    }
    payload.logger.info(`Disciplines: ${DISCIPLINES.length} creadas`);
  } else {
    payload.logger.info("Disciplines ya sembradas, se omite");
  }

  // ── Films: los 4 proyectos ya publicados en work.projects ────────────────
  const { totalDocs: filmCount } = await payload.count({ collection: "films" });

  if (filmCount === 0) {
    for (const [index, project] of content.work.projects.entries()) {
      let thumbnail: number | undefined;
      if (project.imageUrl) {
        const file = await fetchAsMediaFile(project.imageUrl);
        const media = await payload.create({
          collection: "media",
          data: { alt: project.title },
          file,
        });
        thumbnail = media.id;
      }

      await payload.create({
        collection: "films",
        data: {
          title: project.title,
          category: project.category,
          year: project.year,
          description: project.description,
          tags: project.tags.map((tag) => ({ tag })),
          videoUrl: project.href,
          thumbnail,
          order: index,
          status: "published",
        },
      });
    }
    payload.logger.info(`Films: ${content.work.projects.length} creados`);
  } else {
    payload.logger.info("Films ya sembrados, se omite");
  }

  // ── Globals: contenido editorial migrado 1:1 desde content.json ─────────
  await payload.updateGlobal({
    slug: "site-settings",
    data: { contactEmail: content.contactEmail },
  });

  await payload.updateGlobal({
    slug: "loader",
    data: { words: content.loader.words.map((word) => ({ word })) },
  });

  await payload.updateGlobal({
    slug: "nav",
    data: { items: content.nav.items },
  });

  await payload.updateGlobal({
    slug: "hero",
    data: { subtitle: content.hero.subtitle },
  });

  await payload.updateGlobal({
    slug: "work-section",
    data: {
      sectionTitle: content.work.sectionTitle,
      sectionNumber: content.work.sectionNumber,
      headline: toLines(content.work.headline),
    },
  });

  await payload.updateGlobal({
    slug: "about-section",
    data: {
      sectionTitle: content.about.sectionTitle,
      sectionNumber: content.about.sectionNumber,
      statement: toLines(content.about.statement),
      bio: content.about.bio.map((paragraph) => ({ paragraph })),
      principles: content.about.principles,
    },
  });

  await payload.updateGlobal({
    slug: "directory-section",
    data: {
      sectionTitle: content.directory.sectionTitle,
      sectionNumber: content.directory.sectionNumber,
      headline: toLines(content.directory.headline),
      intro: content.directory.intro,
      joinForm: {
        sectionTitle: content.directory.joinForm.sectionTitle,
        sectionNumber: content.directory.joinForm.sectionNumber,
        headline: toLines(content.directory.joinForm.headline),
        intro: content.directory.joinForm.intro,
        form: content.directory.joinForm.form,
      },
    },
  });

  await payload.updateGlobal({
    slug: "media-kit-section",
    data: {
      sectionTitle: content.mediaKit.sectionTitle,
      sectionNumber: content.mediaKit.sectionNumber,
      headline: toLines(content.mediaKit.headline),
      intro: content.mediaKit.intro,
      audience: content.mediaKit.audience,
      formats: content.mediaKit.formats,
      networkLabel: content.mediaKit.networkLabel,
      cta: content.mediaKit.cta,
    },
  });

  await payload.updateGlobal({
    slug: "contact-section",
    data: {
      sectionTitle: content.contact.sectionTitle,
      sectionNumber: content.contact.sectionNumber,
      headline: toLines(content.contact.headline),
      socials: content.contact.socials,
      form: content.contact.form,
      footer: content.contact.footer,
    },
  });

  payload.logger.info("Globals actualizados desde content.json");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
