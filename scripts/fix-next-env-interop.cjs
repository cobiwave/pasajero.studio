/* eslint-disable @typescript-eslint/no-require-imports -- CJS preload loaded via `node --require`, can't be ESM */
/**
 * Workaround for https://github.com/payloadcms/payload/issues/16674
 *
 * @next/env dropped its default export in Next.js 15.5+ (named exports only).
 * payload/dist/bin/loadEnv.js still does `import nextEnvImport from "@next/env"`
 * and destructures `nextEnvImport.loadEnvConfig`. Under tsx/esbuild's strict
 * ESM/CJS interop (which honors the `__esModule` flag @next/env's CJS build
 * sets), that default import resolves to `undefined` and crashes at import
 * time — before any of our code runs. This breaks every standalone script
 * that imports `payload` directly: seed scripts, `payload generate:types`,
 * `payload migrate`, etc.
 *
 * `next dev` / `next build` don't hit this because Next's own bundler
 * (Turbopack/webpack) is more lenient about the missing default and doesn't
 * crash on it — this is specific to running Payload's Local API standalone
 * via tsx/Node.
 *
 * Confirmed this is NOT a tsx version issue (reproduces identically on tsx
 * 4.19.3 through 4.23.1 — the full range on npm as of this writing) and not
 * yet fixed upstream (payloadcms/payload#16674 open, fix PR #16934 unmerged).
 *
 * Delete this file and its usages in package.json once that ships.
 */
const path = require("path");

const payloadEntry = require.resolve("payload");
const nextEnvPath = require.resolve("@next/env", { paths: [path.dirname(payloadEntry)] });
const nextEnv = require(nextEnvPath);

if (!nextEnv.default) {
  nextEnv.default = nextEnv;
}
