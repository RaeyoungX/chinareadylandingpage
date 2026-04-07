/**
 * Generates public/images/og-image.png (1200×630)
 * Uses sharp (already installed via Next.js) — no extra deps.
 *
 * Run:  node scripts/gen-og-image.mjs
 */

import sharp from "sharp";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT  = join(ROOT, "public/images/og-image.png");

const W = 1200;
const H = 630;

// ── Screenshot to embed (right-side phone) ──────────────────────────────────
const screenshotPath = join(ROOT, "public/images/app-screenshot-dashboard.png");
const hasShot = existsSync(screenshotPath);

// ── Build SVG background layer ───────────────────────────────────────────────
const bgSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Main background gradient -->
    <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#0a1628"/>
      <stop offset="100%" stop-color="#0f2d1f"/>
    </linearGradient>

    <!-- Left accent glow -->
    <radialGradient id="glow1" cx="0%" cy="50%" r="70%">
      <stop offset="0%"   stop-color="#1a4a30" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0a1628" stop-opacity="0"/>
    </radialGradient>

    <!-- Right subtle glow -->
    <radialGradient id="glow2" cx="100%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="#1f3a5f" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0f2d1f" stop-opacity="0"/>
    </radialGradient>

    <!-- Clip for phone screenshot -->
    <clipPath id="phoneClip">
      <rect x="800" y="30" width="330" height="570" rx="36" ry="36"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow1)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>

  <!-- Subtle grid lines -->
  <g stroke="#ffffff" stroke-opacity="0.025" stroke-width="1">
    ${Array.from({length: 12}, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${H}"/>`).join("")}
    ${Array.from({length: 7},  (_, i) => `<line x1="0" y1="${i * 90}" x2="${W}" y2="${i * 90}"/>`).join("")}
  </g>

  <!-- Decorative arc -->
  <circle cx="${W}" cy="0" r="480" fill="none" stroke="#1f433a" stroke-width="1.5" stroke-opacity="0.35"/>
  <circle cx="${W}" cy="0" r="360" fill="none" stroke="#1f433a" stroke-width="1"   stroke-opacity="0.2"/>

  <!-- ── Left content ── -->

  <!-- Pill badge -->
  <rect x="68" y="88" width="148" height="32" rx="16" fill="#1f433a" fill-opacity="0.7"
        stroke="#2d6b4a" stroke-width="1"/>
  <circle cx="88" cy="104" r="5" fill="#4ade80"/>
  <text x="100" y="109" font-family="system-ui,-apple-system,sans-serif"
        font-size="12" font-weight="600" fill="#86efac" letter-spacing="0.06em">COMING SOON</text>

  <!-- Brand name -->
  <text x="68" y="200"
        font-family="system-ui,-apple-system,'Segoe UI',sans-serif"
        font-size="82" font-weight="800" fill="#ffffff"
        letter-spacing="-0.04em">China</text>
  <text x="68" y="290"
        font-family="system-ui,-apple-system,'Segoe UI',sans-serif"
        font-size="82" font-weight="800" fill="#4ade80"
        letter-spacing="-0.04em">Ready</text>

  <!-- Divider -->
  <rect x="68" y="316" width="48" height="3" rx="2" fill="#2d6b4a"/>

  <!-- Tagline -->
  <text x="68" y="370"
        font-family="system-ui,-apple-system,sans-serif"
        font-size="22" font-weight="400" fill="#94a3b8"
        letter-spacing="-0.01em">Everything travelers need before</text>
  <text x="68" y="400"
        font-family="system-ui,-apple-system,sans-serif"
        font-size="22" font-weight="400" fill="#94a3b8"
        letter-spacing="-0.01em">landing in China.</text>

  <!-- Feature pills row -->
  ${[
    { label: "Payments",   x: 68  },
    { label: "VPN",        x: 178 },
    { label: "Navigation", x: 238 },
    { label: "SIM",        x: 378 },
  ].map(({ label, x }) => `
    <rect x="${x}" y="444" width="${label.length * 8 + 28}" height="30" rx="15"
          fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1"/>
    <text x="${x + label.length * 4 + 14}" y="464"
          font-family="system-ui,-apple-system,sans-serif"
          font-size="12" font-weight="500" fill="#cbd5e1"
          text-anchor="middle" letter-spacing="0.02em">${label}</text>
  `).join("")}

  <!-- URL -->
  <text x="68" y="564"
        font-family="system-ui,-apple-system,sans-serif"
        font-size="14" fill="#475569" letter-spacing="0.01em">chinaready.org</text>

  <!-- ── Right phone bezel (no screenshot fallback) ── -->
  ${!hasShot ? `
  <rect x="800" y="30" width="330" height="570" rx="36" fill="#1e293b" stroke="#334155" stroke-width="2"/>
  <rect x="818" y="50" width="294" height="530" rx="28" fill="#0f172a"/>
  ` : ""}
</svg>
`;

// ── Compose layers ───────────────────────────────────────────────────────────
const composites = [];

if (hasShot) {
  // Resize screenshot to fit phone screen area (phone bezel 330×570 at x=800,y=30)
  const phoneScreenW = 294;
  const phoneScreenH = 530;

  const shotBuf = await sharp(screenshotPath)
    .resize(phoneScreenW, phoneScreenH, { fit: "cover", position: "top" })
    .toBuffer();

  // Phone bezel (rounded rect clipping done via SVG above; we composite the screenshot then draw the bezel on top)
  composites.push({
    input: shotBuf,
    left: 815,
    top: 50,
  });

  // Bezel overlay SVG drawn on top to frame the screenshot
  const bezelSvg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="800" y="30"  width="330" height="570" rx="36" fill="none"
          stroke="#334155" stroke-width="2.5"/>
    <rect x="815" y="48" width="300" height="534" rx="28" fill="none"
          stroke="#1e293b" stroke-width="3"/>
    <!-- Slight vignette over screenshot -->
    <rect x="815" y="48" width="300" height="534" rx="28"
          fill="url(#shotOverlay)"/>
    <defs>
      <linearGradient id="shotOverlay" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#0f172a" stop-opacity="0.25"/>
        <stop offset="40%"  stop-color="#0f172a" stop-opacity="0"/>
        <stop offset="85%"  stop-color="#0f172a" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#0f172a" stop-opacity="0.6"/>
      </linearGradient>
    </defs>
  </svg>`;

  composites.push({
    input: Buffer.from(bezelSvg),
    left: 0,
    top: 0,
  });
}

await sharp(Buffer.from(bgSvg))
  .composite(composites)
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`✓ OG image written to ${OUT}`);
