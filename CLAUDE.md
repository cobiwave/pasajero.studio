## Contexto de negocio (léelo antes de tocar producto/contenido)

Pasajero Studio está migrando de un sitio-portfolio personal a una **plataforma editorial + directorio invitacional de artistas** dentro del nicho skate/surf/música/cine/foto (foco Buenos Aires). El negocio real no es e-commerce ni ads: es un **media/content studio** que:

1. Produce contenido audiovisual propio (films, entrevistas, podcast) — esto ya existe y funciona.
2. Cura un directorio invitacional de "fine artists" del nicho (alta manual, no self-serve).
3. A mediano plazo, actúa de intermediario entre marcas y esa red de talento (branded content, booking) — ese es el techo de ingresos más alto, no el merch.
   **Implicancia para el código:** prioriza siempre legibilidad editorial y velocidad de carga/percepción (esto vende autoridad a marcas) por sobre features de e-commerce. El directorio de artistas y el "media kit" pesan más que el checkout en esta etapa.

## Stack técnico (verificado en el repo, rama `develop`)

- **Next.js 16** (App Router), **React 19.2**, **TypeScript**
- **Tailwind CSS v4** vía `@tailwindcss/postcss` — tokens definidos en `src/app/globals.css` con `@theme inline`, incluyendo escala tipográfica fluida (Utopia `--step-*`). Evita reintroducir SCSS/CSS Modules salvo casos puntuales de animación (ver `Navbar.module.css` como única excepción actual).
- **GSAP** + `@gsap/react` (`useGSAP` hook) para animaciones — ver `src/lib/gsap.ts` (incluye `prefersReducedMotion()`, que **siempre** debe respetarse en timelines nuevas).
- **Motion** (Framer Motion) también está en dependencias pero el patrón dominante hoy es GSAP directo en componentes de sección.
- **Lenis** (smooth scroll) vía `src/components/SmoothScroll/*`.
- **Zod** para validar el contenido: `src/lib/content.ts` define schemas y lee `src/data/content.json`. Este JSON es un **stand-in temporal** del futuro CMS — cualquier cambio de forma en el JSON debe reflejarse en el schema Zod correspondiente, o el build falla en runtime, no en compile time.
- Linting: `eslint.config.mjs` (config mínima basada en `eslint-config-next`). Scripts actuales: `dev`, `build`, `start`, `lint` (gestor de paquetes: **pnpm**, no npm).
- Hosting: **Vercel** (Hobby plan por ahora — gratis, pero uso no-comercial según sus Fair Use Guidelines; migrar a Pro cuando cierre el primer acuerdo con una marca, no cuando se superen límites técnicos). El `netlify.toml` en la raíz quedó de una decisión anterior y ya no aplica — se puede ignorar o eliminar, no lo uses como referencia de config de deploy.
- Base de datos (fase 2 en adelante): Postgres vía **Supabase**. Usar la connection string de **Session pooler (puerto 5432)**, nunca la de Transaction pooler (puerto 6543) — el adapter de Postgres de Payload (Drizzle) no es compatible con prepared statements en modo transacción.
- **Cualquier script standalone que importe `payload` directamente** (seeds, `generate:types`, futuras migraciones) tiene que pasar por `pnpm payload -- <comando>` o los scripts `seed:prod`/`seed:dev`/`generate:types` de `package.json` — **nunca** `tsx scripts/algo.ts` a secas ni `payload <comando>` directo. Ver "Workaround conocido" abajo.
- Ya existen **Agent Skills** instalados en `.agents/skills/` (gsap-core, gsap-frameworks, gsap-performance, gsap-plugins, gsap-react, gsap-scrolltrigger, gsap-timeline, gsap-utils, frontend-design, vercel-react-best-practices). Claude Code los descubre solo — no dupliques esas reglas acá, referencialas cuando sea relevante (ej. "aplicá las reglas de rendering-hydration-no-flicker.md").

## Convenciones de componentes

- Componente único por carpeta, sin el patrón antiguo Controller/View (ese patrón fue **eliminado a propósito** al migrar de `main` a `develop` — no lo reintroduzcas).
- Estructura: `src/components/NombreComponente/NombreComponente.tsx` + `index.ts` que re-exporta.
- `"use client"` solo en componentes que realmente necesitan interactividad/hooks del navegador (GSAP, Lenis, estado). Todo lo demás, Server Component por default — es intencional en Next.js 16/React 19.
- El contenido textual sale de `content.json` vía `@/lib/content`, nunca hardcodeado dentro del JSX de la sección (excepto microcopy puramente técnico, ej. `aria-label`).

## Roadmap activo (para priorizar sugerencias)

1. Directorio de artistas + media kit (contenido estático, sin auth)
2. Migración de `content.json` → **Payload CMS** (Postgres, self-hosted o Vercel+Neon) — colecciones: `Artists`, `Disciplines`, `Works`, `Films`, `PodcastEpisodes`
3. Auth de artistas (alta por solicitud, aprobación manual vía admin de Payload) + buscador/filtro
4. E-commerce merch propio
5. Marketplace de prints con comisión (Prodigi/Gelato)
   Si te pido una feature, ubicala en esta lista mentalmente antes de proponer alcance — no adelantes complejidad de fases futuras (ej. no metas lógica de pagos en la fase 1).

## Backlog / deuda técnica bloqueante para producción

- **Migrar uploads de Payload a Supabase Storage (S3-compatible) antes del primer deploy a Vercel.** Hoy `Media` usa storage local en disco (`/media`, gitignored) — funciona para desarrollo local pero no sobrevive a un deploy serverless en Vercel (filesystem efímero). Bloqueante para producción, no para seguir desarrollando en local.

## Workaround conocido: scripts standalone de Payload rompen sin `scripts/fix-next-env-interop.cjs`

`payload/dist/bin/loadEnv.js` hace `import nextEnvImport from "@next/env"` y destructura `nextEnvImport.loadEnvConfig`. Desde Next.js 15.5+, `@next/env` dejó de exponer default export (solo named exports) — bajo el interop ESM/CJS estricto de tsx/esbuild eso resuelve a `undefined` y crashea con `TypeError: Cannot destructure property 'loadEnvConfig' of 'import_env.default' as it is undefined` **al importar `payload`**, antes de que corra nuestro código. `pnpm dev`/`pnpm build` NO lo sufren (el bundler de Next es más laxo con ese caso), pero cualquier script standalone sí — seeds, `generate:types`, futuras migraciones.

- **Causa raíz confirmada, no es un problema de versión de tsx**: reproduce igual en tsx 4.19.3 (la más vieja en npm) y 4.23.1 (la más nueva a la fecha) — el rango completo probado. Es un bug de Payload sin fix mergeado todavía: [payloadcms/payload#16674](https://github.com/payloadcms/payload/issues/16674), PR [#16934](https://github.com/payloadcms/payload/pull/16934) abierto, sin mergear.
- **Workaround oficial**: `scripts/fix-next-env-interop.cjs` (preload que resuelve el `@next/env` real que usa `payload` y le sintetiza el default export). Ya está cableado en `package.json`: usar `pnpm payload -- <comando>`, `pnpm seed:prod`, `pnpm seed:dev`, o `pnpm generate:types` — nunca invocar `tsx` o el CLI de `payload` directo.
- **Cuándo borrar esto**: cuando el PR #16934 (o equivalente) se mergee y aparezca en un release de `payload` — a partir de ahí, actualizar la dependencia, borrar `scripts/fix-next-env-interop.cjs`, y volver los scripts de `package.json` a invocar `tsx`/`payload` directo.

## Reglas duras (no negociables)

- **No reintroducir DatoCMS** ni GraphQL — se eliminó deliberadamente en `develop`.
- **No romper `prefersReducedMotion()`** en animaciones nuevas.
- **No agregar dependencias pesadas** (nuevas libs de animación, UI kits, CSS-in-JS) sin preguntar primero — el bundle size importa para percepción de marca premium.
- **No cambiar la forma de `content.json`** sin actualizar el Zod schema en el mismo commit.
- Antes de un refactor grande (>3 archivos), mostrame el plan primero. No lo ejecutes de una.
- Rama de trabajo: nunca commitear directo a `main`. Todo pasa por `develop` o feature branches desde `develop`.

## Política de QA visual

- El body de todas las páginas se renderiza client-side (`SmoothScrollProvider`
  envuelve el contenido con `dynamic(..., { ssr: false })` por requerimiento
  de Lenis) — **`curl`+`grep` sobre el HTML NO sirve** para verificar
  contenido, solo va a ver el HTML del Navbar.
- Verificación real: `pnpm dev` + revisar en navegador (Claude in Chrome
  si está disponible, o el desarrollador a mano). Prestar atención a
  warnings de hidratación en consola como señal de regresión real.
- **Pendiente de decisión de producto:** el `ssr:false` global tiene
  impacto en SEO/link-previews — el sitio depende de descubribilidad
  orgánica y de causar buena impresión a marcas que reciben el link del
  media kit. No resolver de oficio; es una decisión a tomar aparte.

## Comandos útiles

```bash
pnpm dev             # desarrollo local
pnpm build           # build de producción
pnpm start           # servidor de producción local
pnpm lint            # eslint
pnpm generate:types  # regenerar src/payload-types.ts tras cambiar un Collection/Global
pnpm seed:prod       # taxonomía real + Films + Globals (idempotente)
pnpm seed:dev        # 3 artistas placeholder — NO idempotente, correr una sola vez
pnpm payload -- <comando>  # cualquier otro comando del CLI de Payload (ej. migraciones)
```
