import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import ChecklistPreview from "@/components/sections/ChecklistPreview";
import VideoCardCarousel from "@/components/sections/VideoCardCarousel";
import Showcase from "@/components/sections/Showcase";
import HowItWorks from "@/components/sections/HowItWorks";
import GuidesPreview from "@/components/sections/GuidesPreview";
import Faq from "@/components/sections/Faq";
import FeedbackSection from "@/components/sections/FeedbackSection";
import WaitlistSection from "@/components/sections/WaitlistSection";
import { SITE_URL } from "@/lib/constants";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "ChinaReady – Travel Preparation App for China",
  description:
    "The complete travel preparation app for China. Set up payments, VPN, navigation and SIM before you land — built from official sources and real traveler experience.",
  alternates: { canonical: SITE_URL },
  keywords: [
    "China travel preparation",
    "China travel checklist",
    "travel to China tips",
    "China VPN setup",
    "Alipay for tourists",
    "WeChat Pay foreign card",
    "China visa free 2026",
    "China eSIM",
    "ChinaReady app",
  ],
  openGraph: {
    title: "ChinaReady – Travel Preparation App for China",
    description:
      "Set up payments, VPN, navigation and SIM before you land in China. Built from official sources and real traveler experience.",
    url: SITE_URL,
    siteName: "ChinaReady",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "ChinaReady – Travel Preparation App for China" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChinaReady – Travel Preparation App for China",
    description: "Set up payments, VPN, navigation and SIM before you land in China.",
    images: ["/images/og-image.png"],
  },
};

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <Features />
      <ChecklistPreview />
      <VideoCardCarousel />
      <Showcase />
      <HowItWorks />
      <GuidesPreview />
      <Faq />
      <section id="waitlist" className="bg-[#0f172a] py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Stay in the loop</h2>
            <p className="mt-2 text-sm text-slate-400">Join the waitlist or share what we should improve.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <WaitlistSection
              source="homepage_waitlist"
              compact
              className="mt-0"
              eyebrow="App waitlist"
              title="Get notified when the app launches"
              description=""
            />
            <FeedbackSection
              source="homepage"
              compact
              className="mt-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
