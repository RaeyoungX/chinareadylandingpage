/**
 * Generates guide cover images (800x420) in public/images/guides/
 * Style: minimal, typography-first, all English
 * Run: node scripts/gen-guide-covers.mjs
 */

import sharp from "sharp";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public/images/guides");
mkdirSync(OUT_DIR, { recursive: true });

const W = 800;
const H = 420;

const covers = [
  {
    filename: "china-travel-checklist.png",
    label: "ESSENTIALS",
    line1: "China Travel",
    line2: "Checklist",
    accent: "#0f172a",
    labelColor: "#64748b",
  },
  {
    filename: "alipay-wechat-pay.png",
    label: "PAYMENTS",
    line1: "Alipay +",
    line2: "WeChat Pay",
    accent: "#059669",
    labelColor: "#059669",
  },
  {
    filename: "vpn-china-setup-guide.png",
    label: "INTERNET + VPN",
    line1: "VPN Setup",
    line2: "for China",
    accent: "#2563eb",
    labelColor: "#2563eb",
  },
  {
    filename: "china-visa-free-countries-2026.png",
    label: "VISA + ENTRY",
    line1: "Visa-Free",
    line2: "Entry 2026",
    accent: "#d97706",
    labelColor: "#d97706",
  },
  {
    filename: "china-food-guide.png",
    label: "ESSENTIALS",
    line1: "Finding Food",
    line2: "in China",
    accent: "#dc2626",
    labelColor: "#dc2626",
  },
  {
    filename: "china-esim-guide.png",
    label: "INTERNET + VPN",
    line1: "eSIM Guide",
    line2: "for China",
    accent: "#2563eb",
    labelColor: "#2563eb",
  },
  {
    filename: "china-hotel-booking-guide.png",
    label: "ESSENTIALS",
    line1: "Hotel Booking",
    line2: "in China",
    accent: "#0f172a",
    labelColor: "#64748b",
  },
  {
    filename: "chinaready-app-guide.png",
    label: "PRODUCT",
    line1: "ChinaReady",
    line2: "App Guide",
    accent: "#2563eb",
    labelColor: "#2563eb",
  },
  {
    filename: "china-best-time-to-visit.png",
    label: "ESSENTIALS",
    line1: "Best Time",
    line2: "to Visit China",
    accent: "#16a34a",
    labelColor: "#16a34a",
  },
];

for (const cover of covers) {
  const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">

  <!-- White background -->
  <rect width="${W}" height="${H}" fill="#ffffff"/>

  <!-- Top accent bar -->
  <rect x="0" y="0" width="${W}" height="5" fill="${cover.accent}"/>

  <!-- Category label -->
  <text x="56" y="72"
        font-family="system-ui,-apple-system,sans-serif"
        font-size="11" font-weight="700"
        fill="${cover.labelColor}"
        letter-spacing="0.14em">${cover.label}</text>

  <!-- Title line 1 -->
  <text x="56" y="190"
        font-family="system-ui,-apple-system,'Segoe UI',sans-serif"
        font-size="76" font-weight="800"
        fill="#0f172a"
        letter-spacing="-0.04em">${cover.line1}</text>

  <!-- Title line 2 -->
  <text x="56" y="278"
        font-family="system-ui,-apple-system,'Segoe UI',sans-serif"
        font-size="76" font-weight="800"
        fill="${cover.accent}"
        letter-spacing="-0.04em">${cover.line2}</text>

  <!-- Bottom rule -->
  <rect x="56" y="330" width="${W - 112}" height="1" fill="#e2e8f0"/>

  <!-- Watermark -->
  <text x="${W - 56}" y="${H - 22}"
        font-family="system-ui,-apple-system,sans-serif"
        font-size="12" font-weight="500"
        fill="#cbd5e1"
        text-anchor="end"
        letter-spacing="0.02em">chinaready.org</text>

</svg>`;

  const outPath = join(OUT_DIR, cover.filename);
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log(`  ${cover.filename}`);
}

console.log("\nAll guide covers written to public/images/guides/");
