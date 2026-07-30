/**
 * Seed de producción: taxonomía real de Disciplines, los 4 Films existentes
 * y el contenido editorial de los Globals. El contenido está inlineado acá
 * (migrado originalmente desde el extinto content.json/content.ts, ver
 * git history del commit que los borró) porque este script es el único
 * lugar que legítimamente necesitaba esos valores como semilla one-shot —
 * no ameritaba mantener content.ts vivo solo para este consumidor.
 * No crea ningún Artist — el directorio arranca vacío (alta manual vía
 * ArtistApplications, ver plan de colecciones).
 *
 * Requiere src/payload.config.ts + collections/globals ya creados.
 * Correr con: pnpm seed:prod
 */
import { getPayload } from "payload";
import config from "@/payload.config";

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

const CONTACT_EMAIL = "pasajero.studio@gmail.com";

const LOADER_WORDS = ["SKATE", "SURF", "MÚSICA", "CINE", "FOTO", "PASAJERO"];

const NAV_ITEMS = [
  { label: "Work", href: "/work" },
  { label: "Directory", href: "/directory" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const HERO_SUBTITLE =
  "Una red curada de artistas de skate, surf, música, cine y fotografía — y el estudio audiovisual detrás de sus historias.";

const WORK = {
  sectionTitle: "Work",
  sectionNumber: "01",
  headline: ["Original", "short films", "& visual art."],
  projects: [
    {
      title: "REWIND",
      category: "Short Film",
      year: "2024",
      description:
        "A cinematic exploration of memory, time, and the moments we wish we could relive.",
      tags: ["Narrative", "Color Grading", "DaVinci Resolve"],
      href: "https://youtu.be/ARjwoqnlPvc?si=6hzgq1pY2WZm8Kp8",
      imageUrl: "https://img.youtube.com/vi/ARjwoqnlPvc/maxresdefault.jpg",
    },
    {
      title: "RAICES",
      category: "Short Film",
      year: "2024",
      description:
        "Roots that bind us to the earth and the stories carried through generations.",
      tags: ["Documentary", "Analog", "Culture"],
      href: "https://youtu.be/2VXsfjRqW1I?si=CuNtJW1DPQ7fWhY2",
      imageUrl: "https://img.youtube.com/vi/2VXsfjRqW1I/maxresdefault.jpg",
    },
    {
      title: "ALMA DO MAR",
      category: "Short Film",
      year: "2024",
      description:
        "The soul of the sea — a visual poem capturing the raw beauty of the Atlantic coast.",
      tags: ["Visual Poetry", "Cinematography", "Nature"],
      href: "https://youtu.be/g3f-LC6mlbM?si=Xx_NjD7Q5s_76LaZ",
      imageUrl: "https://img.youtube.com/vi/g3f-LC6mlbM/maxresdefault.jpg",
    },
    {
      title: "CONEXIONES",
      category: "Short Film",
      year: "2024",
      description:
        "Human connections in a world that moves too fast — finding stillness in the chaos.",
      tags: ["Experimental", "Urban", "Color Grading"],
      href: "https://youtu.be/xmQs5HwChZA?si=bnQccOynrFnSP8xf",
      imageUrl: "https://img.youtube.com/vi/xmQs5HwChZA/maxresdefault.jpg",
    },
  ],
};

const ABOUT = {
  sectionTitle: "About",
  sectionNumber: "02",
  statement: [
    "Somos un estudio",
    "y una red curada",
    "en el cruce de skate,",
    "surf, música,",
    "cine y fotografía.",
  ],
  bio: [
    "Pasajero Studio nace de cortometrajes, fotografía analógica y entrevistas documentales — contenido propio, no por encargo. Cada pieza se produce con intención, del guion a la corrección de color final.",
    "Al mismo tiempo, Pasajero funciona como puerta de entrada a una red invitacional de artistas del nicho skate, surf, música, cine y foto — muchos de ellos cruzando más de una disciplina. La curaduría es nuestra; el contacto, directo con cada artista.",
  ],
  principles: [
    {
      number: "01",
      title: "Curaduría, no algoritmo",
      description:
        "Elegimos a cada artista de la red a mano. No es un feed infinito, es una selección editorial.",
    },
    {
      number: "02",
      title: "Historias con cámara propia",
      description:
        "Producimos nuestros propios documentales y podcasts sobre la escena — el contenido es la puerta de entrada a la red.",
    },
    {
      number: "03",
      title: "Cruce de disciplinas",
      description:
        "Priorizamos artistas que combinan más de un oficio: skater y fotógrafo, surfista y shaper, músico y filmmaker.",
    },
  ],
};

const DIRECTORY = {
  sectionTitle: "Directory",
  sectionNumber: "03",
  headline: ["Artistas", "de la red", "Pasajero."],
  intro:
    "Un directorio invitacional. Cada artista fue seleccionado a mano por Pasajero — el ingreso es por contacto directo, no por registro abierto.",
  joinForm: {
    sectionTitle: "Sumate",
    sectionNumber: "04",
    headline: ["Quiero", "ser parte", "de la red."],
    intro:
      "Contanos quién sos. Si encajás con la curaduría, te contactamos nosotros — no hay alta automática.",
    form: {
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre o alias",
      disciplinesLabel: "Disciplina",
      contactLabel: "Instagram o email",
      contactPlaceholder: "@usuario o tu@email.com",
      submitLabel: "Enviar solicitud",
      sendingLabel: "Enviando...",
      successMessage: "Listo, la recibimos. Te contactamos si encaja.",
      errorMessage: "No se pudo enviar. Probá de nuevo en un rato.",
    },
  },
};

const MEDIA_KIT = {
  sectionTitle: "Media Kit",
  sectionNumber: "04",
  headline: ["Contenido,", "audiencia", "y red curada."],
  intro:
    "Pasajero Studio combina producción audiovisual propia con una red invitacional de artistas del nicho skate, surf, música, cine y foto. Este media kit resume alcance, formatos y casos de trabajo para marcas evaluando una colaboración.",
  audience: {
    label: "Audiencia y alcance",
    metrics: [
      { label: "Seguidores totales", value: "[MÉTRICA]" },
      { label: "Alcance mensual promedio", value: "[MÉTRICA]" },
      { label: "Vistas promedio por pieza", value: "[MÉTRICA]" },
      { label: "Audiencia principal", value: "[MÉTRICA]" },
    ],
  },
  formats: [
    {
      title: "Cortometrajes originales",
      description:
        "Piezas narrativas o documentales producidas de punta a punta, del guion a la corrección de color.",
    },
    {
      title: "Entrevistas documentales",
      description:
        "Formato conversación con artistas de la red — perfil, oficio y contexto de la escena.",
    },
    {
      title: "Podcast",
      description:
        "Conversaciones long-form sobre skate, surf, música, cine y foto en Buenos Aires.",
    },
    {
      title: "Branded content",
      description:
        "Colaboraciones de marca producidas con el mismo estándar editorial que el contenido propio, apalancando la red de artistas curados.",
    },
  ],
  networkLabel: "artistas en",
  cta: {
    headline: "¿Pensando en una colaboración?",
    description: "Contanos qué tenés en mente y coordinamos una conversación.",
    label: "Escribinos",
  },
};

const CONTACT = {
  sectionTitle: "Contact",
  sectionNumber: "01",
  headline: ["Coming", "soon."],
  socials: [
    { label: "Instagram", href: "https://instagram.com/pasajero.studio" },
    { label: "LinkedIn", href: "https://linkedin.com/company/pasajero-studio" },
  ],
  form: {
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    emailLabel: "Email",
    emailPlaceholder: "tu@email.com",
    messageLabel: "Mensaje",
    messagePlaceholder: "Contanos en qué podemos ayudarte",
    submitLabel: "Enviar mensaje",
  },
  footer: {
    copyright: "PASAJERO STUDIO. All rights reserved.",
    tagline: "Red curada de artistas de skate, surf, música, cine y foto.",
  },
};

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
    for (const [index, project] of WORK.projects.entries()) {
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
    payload.logger.info(`Films: ${WORK.projects.length} creados`);
  } else {
    payload.logger.info("Films ya sembrados, se omite");
  }

  // ── Globals: contenido editorial ─────────────────────────────────────────
  await payload.updateGlobal({
    slug: "site-settings",
    data: { contactEmail: CONTACT_EMAIL },
  });

  await payload.updateGlobal({
    slug: "loader",
    data: { words: LOADER_WORDS.map((word) => ({ word })) },
  });

  await payload.updateGlobal({
    slug: "nav",
    data: { items: NAV_ITEMS },
  });

  await payload.updateGlobal({
    slug: "hero",
    data: { subtitle: HERO_SUBTITLE },
  });

  await payload.updateGlobal({
    slug: "work-section",
    data: {
      sectionTitle: WORK.sectionTitle,
      sectionNumber: WORK.sectionNumber,
      headline: toLines(WORK.headline),
    },
  });

  await payload.updateGlobal({
    slug: "about-section",
    data: {
      sectionTitle: ABOUT.sectionTitle,
      sectionNumber: ABOUT.sectionNumber,
      statement: toLines(ABOUT.statement),
      bio: ABOUT.bio.map((paragraph) => ({ paragraph })),
      principles: ABOUT.principles,
    },
  });

  await payload.updateGlobal({
    slug: "directory-section",
    data: {
      sectionTitle: DIRECTORY.sectionTitle,
      sectionNumber: DIRECTORY.sectionNumber,
      headline: toLines(DIRECTORY.headline),
      intro: DIRECTORY.intro,
      joinForm: {
        sectionTitle: DIRECTORY.joinForm.sectionTitle,
        sectionNumber: DIRECTORY.joinForm.sectionNumber,
        headline: toLines(DIRECTORY.joinForm.headline),
        intro: DIRECTORY.joinForm.intro,
        form: DIRECTORY.joinForm.form,
      },
    },
  });

  await payload.updateGlobal({
    slug: "media-kit-section",
    data: {
      sectionTitle: MEDIA_KIT.sectionTitle,
      sectionNumber: MEDIA_KIT.sectionNumber,
      headline: toLines(MEDIA_KIT.headline),
      intro: MEDIA_KIT.intro,
      audience: MEDIA_KIT.audience,
      formats: MEDIA_KIT.formats,
      networkLabel: MEDIA_KIT.networkLabel,
      cta: MEDIA_KIT.cta,
    },
  });

  await payload.updateGlobal({
    slug: "contact-section",
    data: {
      sectionTitle: CONTACT.sectionTitle,
      sectionNumber: CONTACT.sectionNumber,
      headline: toLines(CONTACT.headline),
      socials: CONTACT.socials,
      form: CONTACT.form,
      footer: CONTACT.footer,
    },
  });

  payload.logger.info("Globals actualizados");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
