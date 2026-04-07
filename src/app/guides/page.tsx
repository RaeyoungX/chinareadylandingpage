import type { Metadata } from "next";
import { guides } from "@/lib/guides";
import { SITE_URL } from "@/lib/constants";
import GuidesSearch from "@/components/sections/GuidesSearch";

export const metadata: Metadata = {
  title: "China Travel Guides",
  description:
    "Practical guides for traveling to China: how to set up payments, VPN, navigate visa-free entry, and prepare before you land.",
  alternates: { canonical: `${SITE_URL}/guides` },
  keywords: [
    "China travel guide",
    "how to travel to China",
    "China tourist tips",
    "China payment setup",
    "China VPN guide",
    "China visa free countries",
    "best time to visit China",
    "China eSIM guide",
  ],
  openGraph: {
    title: "China Travel Guides – ChinaReady",
    description:
      "Practical guides for traveling to China: payments, VPN, visa-free entry, and pre-departure checklists.",
    url: `${SITE_URL}/guides`,
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "China Travel Guides – ChinaReady" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "China Travel Guides – ChinaReady",
    description: "Practical guides for traveling to China: payments, VPN, visa-free entry, and pre-departure checklists.",
    images: ["/images/og-image.png"],
  },
};

export default function GuidesPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/guides/${guide.slug}`,
      name: guide.title,
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    ],
  };

  return (
    <main className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Page header */}
      <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] py-14 lg:py-18">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
            Travel guides
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Everything you need before landing in China
          </h1>
          <p className="mt-4 text-base text-slate-500 max-w-xl leading-relaxed">
            Practical, up-to-date guides on payments, VPN, visa-free entry, and pre-departure prep.
          </p>
        </div>
      </div>

      {/* Search + guide grid */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <GuidesSearch guides={guides} />
      </div>
    </main>
  );
}
