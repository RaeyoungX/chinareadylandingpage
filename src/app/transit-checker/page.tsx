import type { Metadata } from "next";
import Link from "next/link";
import TransitChecker from "@/components/tools/TransitChecker";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "240-Hour China Transit Checker — Free Tool",
  description:
    "Check whether your itinerary qualifies for China's 240-hour visa-free transit policy. Supports multi-city trips, multiple China entries, airside transits, and all 7 restricted regions. Free, no signup.",
  alternates: { canonical: `${SITE_URL}/transit-checker` },
  keywords: [
    "240 hour visa free china",
    "china transit visa free checker",
    "china 240 hour transit eligibility",
    "10 day china visa free transit",
    "china visa free transit tool",
    "china transit without visa",
  ],
  openGraph: {
    title: "240-Hour China Transit Checker | ChinaReady",
    description:
      "Find out in 30 seconds if your trip qualifies for visa-free transit through China. Supports multi-city, multi-entry, and airside transits.",
    url: `${SITE_URL}/transit-checker`,
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "240-Hour China Transit Checker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "240-Hour China Transit Checker | ChinaReady",
    description: "Find out in 30 seconds if your trip qualifies for visa-free transit through China.",
    images: ["/images/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "240-Hour China Transit Checker",
  url: `${SITE_URL}/transit-checker`,
  applicationCategory: "TravelApplication",
  description:
    "Check whether your itinerary qualifies for China's 240-hour visa-free transit policy. Supports multi-city trips, multiple entries, airside transits, and restricted regions.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "ChinaReady", url: SITE_URL },
};

export default function TransitCheckerPage() {
  return (
    <main className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] py-12 lg:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <Link
            href="/guides/china-visa-free-countries-2026"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors mb-5"
          >
            ← Visa-free entry guide
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">Free tool</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            240-Hour China Transit Checker
          </h1>
          <p className="mt-3 text-slate-500 leading-relaxed max-w-xl">
            Find out in 30 seconds whether your itinerary qualifies for China&apos;s 240-hour visa-free transit policy.
            Built for real trips — multi-city, multi-entry, airside transits, and the cities that aren&apos;t eligible even though their province is.
          </p>
        </div>
      </div>

      <TransitChecker />

      {/* Footer note */}
      <div className="border-t border-slate-100 bg-slate-50 py-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            Built by{" "}
            <Link href="/" className="text-slate-500 hover:text-slate-700 underline">ChinaReady</Link>
            {" "}— the free prep guide for first-time travellers to China.{" "}
            <Link href="/guides/china-visa-free-countries-2026" className="text-slate-500 hover:text-slate-700 underline">
              Read the full visa-free entry guide →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
