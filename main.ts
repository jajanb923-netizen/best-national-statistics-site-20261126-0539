// NusaStat entrypoint (Node 22, standard library only).
//
// The site lives in app/ as plain static files: index.html, one stylesheet,
// and ES modules that render the pages from data.js. Nothing the site runs,
// styles or shows loads over the network.
//
// This program hands the entry in: it copies app/ and screenshots/ from
// beside this file into /output and writes /output/dossier.json with the
// vendored make.fun library, which is the summary the judge reads (the
// screenshots, the first load's files and bytes, and the source). The vendor
// file stays as the kit shipped it: the scorer requires dossier.json to be
// byte for byte what its own copy of that library writes.
//
// Run it outside the grader with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const here = fileURLToPath(new URL(".", import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Fail fast instead of handing in an empty shell: without the shell page
// the judge would see a broken site even though the build "succeeded".
if (!existsSync(join(here, "app", "index.html"))) {
  throw new Error("app/index.html is missing next to main.ts; refusing to build an empty entry");
}

mkdirSync(out, { recursive: true });
cpSync(join(here, "app"), join(out, "app"), { recursive: true });
mkdirSync(join(out, "screenshots"), { recursive: true });
if (existsSync(join(here, "screenshots"))) {
  cpSync(join(here, "screenshots"), join(out, "screenshots"), { recursive: true });
}

// The scorer's own caps: only text_max_bytes shapes the bytes; the others
// refuse an entry the scorer would refuse (more than 4 screenshots or one
// over 256 KiB; more than 993 files and directories in app/ or 16 MiB of
// app files: app/ counts beside /output's own 1000-entry cap, its
// screenshots/ and dossier.json).
writeFileSync(
  join(out, "dossier.json"),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
console.log("wrote " + join(out, "dossier.json") + "; app/ and screenshots/ copied to " + out);
