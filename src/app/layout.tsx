import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ChinaReady – Travel Preparation App for China",
    template: "%s | ChinaReady",
  },
  description:
    "The complete travel preparation app for China. Set up payments, VPN, navigation and SIM before you land — built from official sources and real traveler experience.",
  keywords: [
    "China travel",
    "China trip preparation",
    "travel to China",
    "China VPN",
    "WeChat Pay setup",
    "Alipay for tourists",
    "China travel checklist",
    "China entry requirements",
    "visa-free China",
  ],
  authors: [{ name: "ChinaReady" }],
  creator: "ChinaReady",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: ["/icon.png"],
    apple: [{ url: "/icon.png" }],
  },
  openGraph: {
    title: "ChinaReady – Travel Preparation App for China",
    description:
      "Set up payments, VPN, navigation and SIM before you land in China. Built from official sources and real traveler experience.",
    url: SITE_URL,
    siteName: "ChinaReady",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "ChinaReady – Travel Preparation App for China",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChinaReady – Travel Preparation App for China",
    description:
      "Set up payments, VPN, navigation and SIM before you land in China.",
    images: ["/images/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ChinaReady",
  url: SITE_URL,
  applicationCategory: "TravelApplication",
  operatingSystem: "iOS, Android",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "The complete travel preparation app for China. Set up payments, VPN, navigation and SIM before you land.",
  publisher: {
    "@type": "Organization",
    name: "ChinaReady",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.png`,
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ChinaReady",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/guides?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.className} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col overflow-x-hidden antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XMHSTM65K4"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XMHSTM65K4');`}
        </Script>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
