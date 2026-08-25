#!/usr/bin/env node
/**
 * Copie (et compile quand il le faut) les bibliotheques tierces depuis node_modules
 * vers vendor/, pour que l'application embarque tout et fonctionne 100% hors ligne.
 *
 * Lancer : npm run vendor
 */
import { existsSync, mkdirSync, readdirSync, copyFileSync, writeFileSync, rmSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { genererIcones } from './icones.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const MODULES = join(ROOT, 'node_modules');
const VENDOR = join(ROOT, 'vendor');

const log = (msg) => process.stdout.write(`  ${msg}\n`);

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function copy(from, to) {
  const src = join(MODULES, from);
  const dest = join(VENDOR, to);
  if (!existsSync(src)) throw new Error(`Fichier source introuvable : ${from}`);
  ensureDir(dirname(dest));
  copyFileSync(src, dest);
  return statSync(dest).size;
}

function humanSize(bytes) {
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
  return `${Math.round(bytes / 1024)} Ko`;
}

/* ------------------------------------------------------------------ Pyodide */
// Le vrai CPython compile en WebAssembly. Ces 5 fichiers suffisent pour la
// bibliotheque standard (math, random, json, datetime...) sans paquet externe.
function vendorPyodide() {
  const files = [
    'pyodide.mjs',
    'pyodide.asm.mjs',
    'pyodide.asm.wasm',
    'python_stdlib.zip',
    'pyodide-lock.json',
  ];
  let total = 0;
  for (const file of files) total += copy(`pyodide/${file}`, `pyodide/${file}`);
  log(`pyodide      ${files.length} fichiers, ${humanSize(total)}`);
}

/* -------------------------------------------------------------------- JSCPP */
// JSCPP n'est publie qu'en CommonJS : on le compile en un seul fichier
// utilisable directement dans le navigateur, expose sous window.JSCPP.
async function vendorJscpp() {
  const outfile = join(VENDOR, 'jscpp/jscpp.js');
  ensureDir(dirname(outfile));
  await build({
    entryPoints: [join(MODULES, 'JSCPP/lib/commonjs.js')],
    bundle: true,
    format: 'iife',
    globalName: 'JSCPP',
    platform: 'browser',
    target: 'es2020',
    minify: true,
    legalComments: 'none',
    outfile,
    logLevel: 'silent',
    define: { 'process.env.NODE_ENV': '"production"' },
    // JSCPP depend de `printf`, ecrit pour Node : on remplace ses deux imports
    // systeme par des substituts navigateur (voir tools/shims/).
    alias: {
      util: join(ROOT, 'tools/shims/util.js'),
      stream: join(ROOT, 'tools/shims/stream.js'),
    },
  });
  log(`jscpp        1 fichier compile, ${humanSize(statSync(outfile).size)}`);
}

/* --------------------------------------------------------------- CodeMirror */
function vendorCodemirror() {
  const files = [
    'lib/codemirror.js',
    'lib/codemirror.css',
    'mode/python/python.js',
    'mode/clike/clike.js',
    'mode/xml/xml.js',
    'mode/css/css.js',
    'mode/javascript/javascript.js',
    'mode/htmlmixed/htmlmixed.js',
    'addon/edit/closebrackets.js',
    'addon/edit/matchbrackets.js',
    'addon/edit/closetag.js',
    'addon/selection/active-line.js',
    'addon/comment/comment.js',
    'addon/display/placeholder.js',
  ];
  let total = 0;
  for (const file of files) total += copy(`codemirror/${file}`, `codemirror/${file}`);
  log(`codemirror   ${files.length} fichiers, ${humanSize(total)}`);
}

/* ------------------------------------------------------------------ Polices */
// Polices libres (licence OFL) embarquees : aucun chargement reseau.
// On ne garde que les sous-ensembles latin / latin-ext, largement suffisants
// pour le francais et l'anglais, et on genere une seule feuille de style.
const FONTS = [
  { pkg: 'space-grotesk', family: 'Space Grotesk', weights: [500, 600, 700] },
  { pkg: 'inter', family: 'Inter', weights: [400, 500, 600, 700] },
  { pkg: 'jetbrains-mono', family: 'JetBrains Mono', weights: [400, 500, 700] },
];
const SUBSETS = ['latin', 'latin-ext'];

function vendorFonts() {
  const rules = [];
  let total = 0;
  let count = 0;

  for (const { pkg, family, weights } of FONTS) {
    for (const weight of weights) {
      for (const subset of SUBSETS) {
        const name = `${pkg}-${subset}-${weight}-normal.woff2`;
        const src = `@fontsource/${pkg}/files/${name}`;
        if (!existsSync(join(MODULES, src))) continue;
        total += copy(src, `fonts/${name}`);
        count += 1;
        rules.push(
          `@font-face {\n` +
            `  font-family: '${family}';\n` +
            `  font-style: normal;\n` +
            `  font-weight: ${weight};\n` +
            `  font-display: block;\n` +
            `  src: url('./${name}') format('woff2');\n` +
            `}`
        );
      }
    }
    copy(`@fontsource/${pkg}/LICENSE`, `fonts/LICENSE-${pkg}.txt`);
  }

  writeFileSync(
    join(VENDOR, 'fonts/fonts.css'),
    `/* Genere par tools/vendor.mjs — ne pas modifier a la main.\n` +
      `   Polices sous licence SIL Open Font License 1.1 (voir LICENSE-*.txt). */\n\n` +
      rules.join('\n\n') +
      '\n'
  );
  log(`polices      ${count} fichiers woff2, ${humanSize(total)}`);
}

/* --------------------------------------------------------------------- main */
async function main() {
  process.stdout.write('\nVendorisation des bibliotheques embarquees\n\n');

  if (!existsSync(MODULES)) {
    process.stderr.write('node_modules absent : lancer `npm install` d abord.\n');
    process.exit(1);
  }

  if (existsSync(VENDOR)) rmSync(VENDOR, { recursive: true, force: true });
  ensureDir(VENDOR);

  vendorPyodide();
  await vendorJscpp();
  vendorCodemirror();
  vendorFonts();

  const icones = genererIcones(MODULES, join(ROOT, 'app/js/icones-generees.js'));
  log(`icones       ${icones.icones} icones + ${icones.logos} logos, ${humanSize(icones.octets)}`);

  let files = 0;
  let bytes = 0;
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else {
        files += 1;
        bytes += statSync(full).size;
      }
    }
  };
  walk(VENDOR);

  writeFileSync(
    join(VENDOR, 'README.md'),
    `# vendor/\n\n` +
      `Contenu genere automatiquement par \`npm run vendor\` depuis \`node_modules\`.\n` +
      `Ne rien modifier ici a la main : le dossier est efface et reconstruit a chaque execution.\n\n` +
      `Ces fichiers sont embarques dans l'application pour qu'elle fonctionne entierement\n` +
      `hors ligne, sans CDN ni acces reseau.\n\n` +
      `| Bibliotheque | Role | Licence |\n` +
      `|---|---|---|\n` +
      `| Pyodide | CPython compile en WebAssembly | MPL-2.0 |\n` +
      `| JSCPP | Interpreteur C++ en JavaScript | MIT |\n` +
      `| CodeMirror 5 | Editeur de code | MIT |\n` +
      `| Space Grotesk / Inter / JetBrains Mono | Polices | OFL-1.1 |\n`
  );

  process.stdout.write(`\n  Total : ${files} fichiers, ${humanSize(bytes)} dans ${relative(ROOT, VENDOR)}/\n\n`);
}

main().catch((err) => {
  process.stderr.write(`\nEchec de la vendorisation : ${err.message}\n\n`);
  process.exit(1);
});
