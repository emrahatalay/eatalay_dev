// Statik dosyaların .gz ve .br kopyalarını önceden üretir; nginx bunları gzip_static / brotli_static ile
// olduğu gibi verir, her istekte yeniden sıkıştırmaz (deploy/nginx.conf). deploy iş akışı çağırır:
//   node deploy/sikistir.mjs .next/standalone/.next/static
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { brotliCompressSync, constants, gzipSync } from "node:zlib";

const UZANTILAR = new Set([".js", ".css", ".svg", ".json", ".txt", ".map", ".ttf", ".otf", ".webmanifest"]);
const EN_AZ = 1024; // Daha küçük dosyalarda kazanç başlık maliyetini geçmez.

async function* dosyalar(klasor) {
  for (const giris of await readdir(klasor, { withFileTypes: true })) {
    const yol = join(klasor, giris.name);
    if (giris.isDirectory()) yield* dosyalar(yol);
    else if (UZANTILAR.has(extname(giris.name))) yield yol;
  }
}

let adet = 0;
let once = 0;
let sonra = 0;
for (const klasor of process.argv.slice(2)) {
  for await (const yol of dosyalar(klasor)) {
    if ((await stat(yol)).size < EN_AZ) continue;
    const veri = await readFile(yol);
    const br = brotliCompressSync(veri, {
      params: { [constants.BROTLI_PARAM_QUALITY]: 11, [constants.BROTLI_PARAM_SIZE_HINT]: veri.length },
    });
    await writeFile(`${yol}.gz`, gzipSync(veri, { level: 9 }));
    await writeFile(`${yol}.br`, br);
    adet += 1;
    once += veri.length;
    sonra += br.length;
  }
}
console.log(`${adet} dosya sıkıştırıldı: ${(once / 1024).toFixed(0)} KB → br ${(sonra / 1024).toFixed(0)} KB`);
