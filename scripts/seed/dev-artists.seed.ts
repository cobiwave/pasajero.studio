/**
 * Seed de DESARROLLO únicamente: los 3 artistas placeholder que hoy viven
 * en content.json (directory.artists), para poder ver el layout del
 * directorio con datos de ejemplo. Nunca corre contra producción — son
 * datos falsos ("EJEMPLO — Nombre Artista"), no artistas reales aprobados.
 *
 * Requiere haber corrido `pnpm seed:prod` antes (siembra la taxonomía real
 * de Disciplines que estos artistas referencian).
 *
 * Correr con: pnpm seed:dev
 */
import { getPayload } from "payload";
import config from "@/payload.config";

if (process.env.NODE_ENV === "production") {
  console.error(
    "dev-artists.seed.ts no puede correr con NODE_ENV=production. Abortando."
  );
  process.exit(1);
}

const PLACEHOLDER_ARTISTS = [
  {
    name: "EJEMPLO — Nombre Artista",
    disciplines: ["Skater", "Fotógrafo"],
    location: "Buenos Aires, AR",
    bio: "Reemplazar con bio corta (1-2 líneas) del artista real aprobado.",
    contactHref: "https://instagram.com/usuario_ejemplo",
    featured: true,
  },
  {
    name: "EJEMPLO — Nombre Artista",
    disciplines: ["Surfista", "Shaper"],
    location: "Mar del Plata, AR",
    bio: "Reemplazar con bio corta (1-2 líneas) del artista real aprobado.",
    contactHref: "https://instagram.com/usuario_ejemplo",
    featured: false,
  },
  {
    name: "EJEMPLO — Nombre Artista",
    disciplines: ["Músico", "Filmmaker"],
    location: "Buenos Aires, AR",
    bio: "Reemplazar con bio corta (1-2 líneas) del artista real aprobado.",
    contactHref: "https://instagram.com/usuario_ejemplo",
    featured: false,
  },
];

const slugify = (value: string, suffix: number) =>
  `${value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}-${suffix}`;

async function run() {
  const payload = await getPayload({ config });

  const { docs: allDisciplines } = await payload.find({
    collection: "disciplines",
    limit: 100,
  });

  if (allDisciplines.length === 0) {
    console.error(
      "No hay Disciplines sembradas todavía. Corré `pnpm seed:prod` primero (siembra la taxonomía real)."
    );
    process.exit(1);
  }

  const disciplineIdByName = new Map(
    allDisciplines.map((d) => [d.name as string, d.id])
  );

  for (const [index, artist] of PLACEHOLDER_ARTISTS.entries()) {
    const disciplineIds = artist.disciplines
      .map((name) => disciplineIdByName.get(name))
      .filter((id): id is number => Boolean(id));

    if (disciplineIds.length === 0) {
      console.warn(`Sin match de disciplinas para "${artist.name}", se omite`);
      continue;
    }

    await payload.create({
      collection: "artists",
      data: {
        name: artist.name,
        slug: slugify(artist.name, index),
        disciplines: disciplineIds,
        location: artist.location,
        bio: artist.bio,
        contactHref: artist.contactHref,
        featured: artist.featured,
        status: "approved", // solo para ver el layout en dev; no es un dato real
      },
    });
  }

  payload.logger.info(
    `Dev seed: ${PLACEHOLDER_ARTISTS.length} artistas placeholder creados`
  );
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
