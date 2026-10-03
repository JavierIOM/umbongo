import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
mkdirSync(root, { recursive: true });

const ogSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f1117" />
      <stop offset="100%" stop-color="#1a1f2e" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect x="0" y="0" width="6" height="630" fill="#F56400" />

  <!-- decorative chain/link shapes -->
  <g stroke="#F56400" stroke-width="10" fill="none" opacity="0.9">
    <rect x="760" y="230" width="110" height="170" rx="55" transform="rotate(-20 815 315)" />
    <rect x="870" y="230" width="110" height="170" rx="55" transform="rotate(-20 925 315)" />
  </g>

  <text x="80" y="300" font-family="'Courier New', monospace" font-weight="bold" font-size="92" fill="#ffffff">umbo.ngo</text>
  <text x="80" y="360" font-family="'Courier New', monospace" font-size="34" fill="#94a3b8">short links &amp; file store</text>

  <text x="80" y="580" font-family="'Courier New', monospace" font-size="26" fill="#475569">umbo.ngo</text>
</svg>
`;

const faviconSvg = `
<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <rect width="256" height="256" rx="48" fill="#0f1117" />
  <g stroke="#F56400" stroke-width="22" fill="none" stroke-linecap="round">
    <rect x="68" y="88" width="70" height="110" rx="35" transform="rotate(-20 103 143)" />
    <rect x="118" y="88" width="70" height="110" rx="35" transform="rotate(-20 153 143)" />
  </g>
</svg>
`;

await sharp(Buffer.from(ogSvg)).png().toFile(join(root, "og-image.png"));

await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile(join(root, "favicon-32.png"));
await sharp(Buffer.from(faviconSvg)).resize(180, 180).png().toFile(join(root, "apple-touch-icon.png"));
await sharp(Buffer.from(faviconSvg)).resize(32, 32).toFile(join(root, "favicon.ico"));

console.log("Generated og-image.png, favicon-32.png, apple-touch-icon.png, favicon.ico");
