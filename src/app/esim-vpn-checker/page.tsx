import type { Metadata } from "next";
import Link from "next/link";
import EsimVpnChecker from "@/components/tools/EsimVpnChecker";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "eSIM vs VPN for China — Do You Need Both?",
  description:
    "Most travelers to China don't need a VPN. Answer 3 questions and get a specific recommendation based on your situation — Wi-Fi usage, TikTok, and AI tools.",
  alternates: { canonical: `${SITE_URL}/esim-vpn-checker` },
  keywords: [
    "esim vs vpn china",
    "do i need vpn china",
    "china esim or vpn",
    "vpn china travel",
    "china esim 2026",
    "esim china travel guide",
  ],
  openGraph: {
    title: "eSIM vs VPN for China | ChinaReady",
    description: "Answer 3 questions — find out whether you need an eSIM, a VPN, or both for your China trip.",
    url: `${SITE_URL}/esim-vpn-checker`,
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "eSIM vs VPN for China" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "eSIM vs VPN for China | ChinaReady",
    description: "Answer 3 questions — find out whether you need an eSIM, a VPN, or both.",
    images: ["/images/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "eSIM vs VPN for China Checker",
  url: `${SITE_URL}/esim-vpn-checker`,
  applicationCategory: "TravelApplication",
  description: "Quick decision tool to determine whether a traveler to China needs an eSIM, a VPN, or both.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "ChinaReady", url: SITE_URL },
};

export default function EsimVpnCheckerPage() {
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
            href="/guides/china-esim-guide"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors mb-5"
          >
            ← eSIM guide
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">Free tool</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            eSIM vs VPN for China
          </h1>
          <p className="mt-3 text-slate-500 leading-relaxed max-w-xl">
            Most travelers to China don&apos;t need a VPN. Answer 5 questions and get a recommendation tailored to your actual situation.
          </p>
        </div>
      </div>

      <EsimVpnChecker />

      {/* Footer note */}
      <div className="border-t border-slate-100 bg-slate-50 py-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            Built by{" "}
            <Link href="/" className="text-slate-500 hover:text-slate-700 underline">ChinaReady</Link>
            {" "}—{" "}
            <Link href="/guides/china-esim-guide" className="text-slate-500 hover:text-slate-700 underline">
              Read the full eSIM guide →
            </Link>
            {" "}·{" "}
            <Link href="/guides/vpn-china-setup-guide" className="text-slate-500 hover:text-slate-700 underline">
              VPN setup guide →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
