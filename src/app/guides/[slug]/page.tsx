import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { guides, categoryLabels, categoryColors } from "@/lib/guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `${SITE_URL}/guides/${slug}` },
    keywords: [
      guide.title,
      "China travel guide",
      "China travel checklist",
      categoryLabels[guide.category],
      "ChinaReady",
    ],
    authors: [{ name: "ChinaReady" }],
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${SITE_URL}/guides/${slug}`,
      siteName: "ChinaReady",
      type: "article",
      publishedTime: guide.publishedAt,
      images: guide.coverImage
        ? [{ url: guide.coverImage, width: 1200, height: 630, alt: guide.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: guide.coverImage ? [guide.coverImage] : undefined,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const relatedGuides = (guide.related ?? [])
    .map((s) => guides.find((g) => g.slug === s))
    .filter(Boolean) as typeof guides;

  const { default: Content } = await import(`@/content/guides/${slug}.mdx`);

  const faqJsonLd = guide.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    author: { "@type": "Organization", name: "ChinaReady" },
    publisher: {
      "@type": "Organization",
      name: "ChinaReady",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
    },
    mainEntityOfPage: `${SITE_URL}/guides/${slug}`,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${SITE_URL}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `${SITE_URL}/guides/${slug}`,
      },
    ],
  };

  return (
    <main className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      {/* Back link */}
      <div className="border-b border-slate-100 bg-slate-50/60 py-4">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            ← All guides
          </Link>
        </div>
      </div>

      {/* Article header */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-5">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${categoryColors[guide.category]}`}>
            {categoryLabels[guide.category]}
          </span>
          <span className="text-xs text-slate-400">{guide.readingTime} read</span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-400">
            {new Date(guide.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl leading-tight">
          {guide.title}
        </h1>
        <p className="mt-4 text-lg text-slate-500 leading-relaxed">{guide.description}</p>
      </div>

      {/* MDX content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="prose prose-slate max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:leading-relaxed prose-p:text-slate-600
          prose-a:text-sky-700 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-900
          prose-li:text-slate-600
          prose-img:rounded-2xl prose-img:shadow-md
          prose-blockquote:border-sky-300 prose-blockquote:bg-sky-50/60 prose-blockquote:rounded-xl prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:not-italic
          prose-code:bg-slate-100 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-slate-800 prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
        ">
          <Content />
        </div>

        {/* Related guides */}
        {relatedGuides.length > 0 && (
          <div className="mt-16">
            <h2 className="text-lg font-bold text-slate-950 mb-5">Related guides</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {relatedGuides.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/guides/${rel.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)] transition hover:shadow-[0_6px_24px_rgba(15,23,42,0.10)] hover:-translate-y-0.5"
                >
                  {rel.coverImage && (
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover object-left-top transition duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold mb-2 ${categoryColors[rel.category]}`}>
                      {categoryLabels[rel.category]}
                    </span>
                    <p className="text-sm font-bold text-slate-900 leading-snug group-hover:text-sky-700 transition-colors">
                      {rel.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA at end of article */}
        <div className="mt-16 rounded-3xl bg-[linear-gradient(135deg,#0f172a_0%,#1f433a_100%)] p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-3">
            ChinaReady App
          </p>
          <h2 className="text-2xl font-bold text-white">
            Track your readiness before every trip
          </h2>
          <p className="mt-3 text-slate-400 max-w-md mx-auto">
            The app guides you through every step — payments, VPN, navigation, documents — so nothing gets missed.
          </p>
          <Link
            href="/#waitlist"
            className="mt-6 inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 shadow-lg hover:bg-slate-100 transition"
          >
            Join the waitlist
          </Link>
        </div>
      </div>
    </main>
  );
}
