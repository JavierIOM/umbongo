import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
mkdirSync(root, { recursive: true });

const fruits = `
  <g transform="translate(860,120)">
    <circle cx="0" cy="20" r="26" fill="#ffd23f"/>
    <path d="M-8 -2c3-6 12-9 18-6-3 6-9 9-18 6z" fill="#2fa84f"/>
  </g>
  <g transform="translate(930,110)">
    <path d="M0 -14l9 15-9 6-9-6z" fill="#2fa84f"/>
    <rect x="-18" y="8" width="36" height="36" rx="9" fill="#ffc83f"/>
  </g>
  <g transform="translate(1000,130)">
    <ellipse cx="0" cy="0" rx="24" ry="27" fill="#8bc34a"/>
    <circle cx="0" cy="0" r="15" fill="#f3f0c4"/>
  </g>
  <g transform="translate(1065,115)">
    <path d="M-20 10c18-3 33 9 33 27 0 12-9 21-21 21-3 0-6-3-3-6 12-3 18-12 15-24-3-12-15-18-27-15-3 0-3-3 3-3z" fill="#ffd23f"/>
  </g>
`;

const ogSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2b1055" />
      <stop offset="55%" stop-color="#7a2063" />
      <stop offset="100%" stop-color="#c2410c" />
    </linearGradient>
    <linearGradient id="word" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffd23f" />
      <stop offset="50%" stop-color="#F56400" />
      <stop offset="100%" stop-color="#ff5d8f" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />

  ${fruits}

  <text x="80" y="340" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="110" fill="url(#word)">umbongo</text>
  <text x="84" y="390" font-family="'Baloo 2', sans-serif" font-weight="700" font-style="italic" font-size="36" fill="#ffd23f">they drink it in the congo</text>
  <text x="84" y="440" font-family="'JetBrains Mono', monospace" font-size="24" fill="#e9d5ff">short links, made quick</text>

  <text x="80" y="580" font-family="'JetBrains Mono', monospace" font-size="24" fill="#d9bfe8">umbo.ngo</text>
</svg>
`;

const faviconSvg = `
<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2b1055" />
      <stop offset="55%" stop-color="#7a2063" />
      <stop offset="100%" stop-color="#c2410c" />
    </linearGradient>
  </defs>
  <rect width="256" height="256" rx="48" fill="url(#bg)" />
  <circle cx="128" cy="150" r="54" fill="#ffd23f"/>
  <path d="M100 100c7-13 27-19 40-13-7 13-20 19-40 13z" fill="#2fa84f"/>
</svg>
`;

await sharp(Buffer.from(ogSvg)).png().toFile(join(root, "og-image.png"));

await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile(join(root, "favicon-32.png"));
await sharp(Buffer.from(faviconSvg)).resize(180, 180).png().toFile(join(root, "apple-touch-icon.png"));
await sharp(Buffer.from(faviconSvg)).resize(32, 32).toFile(join(root, "favicon.ico"));

console.log("Generated og-image.png, favicon-32.png, apple-touch-icon.png, favicon.ico");
