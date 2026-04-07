import Link from "next/link";
import Image from "next/image";
import { guides, categoryLabels, categoryColors } from "@/lib/guides";

// Show the 3 most useful guides for homepage visitors
const FEATURED_SLUGS = [
  "china-travel-checklist",
  "how-to-set-up-alipay-wechat-pay-as-tourist",
  "vpn-china-setup-guide",
];

const featured = FEATURED_SLUGS.map((slug) =>
  guides.find((g) => g.slug === slug)!
);

export default function GuidesPreview() {
  return (
    <section className="bg-[#f8fafc] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">
              Free guides
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Everything you need before you land
            </h2>
            <p className="mt-2 text-slate-500 max-w-lg">
              Practical, up-to-date guides on payments, VPN, visa-free entry, food, and more.
            </p>
          </div>
          <Link
            href="/guides"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-900 transition-colors shrink-0 ml-8"
          >
            View all guides →
          </Link>
        </div>

        {/* Guide cards */}
        <div className="grid gap-5 sm:grid-cols-3">
          {featured.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)] transition hover:shadow-[0_8px_28px_rgba(15,23,42,0.10)] hover:-translate-y-0.5"
            >
              {guide.coverImage && (
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={guide.coverImage}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover object-left-top transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <span className={`self-start rounded-full px-2 py-0.5 text-xs font-semibold mb-3 ${categoryColors[guide.category]}`}>
                  {categoryLabels[guide.category]}
                </span>
                <h3 className="text-sm font-bold text-slate-950 leading-snug group-hover:text-sky-700 transition-colors flex-1">
                  {guide.title}
                </h3>
                <span className="mt-4 text-xs font-semibold text-sky-700 inline-flex items-center gap-0.5 transition-transform group-hover:translate-x-0.5">
                  Read guide →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700"
          >
            View all guides →
          </Link>
        </div>

      </div>
    </section>
  );
}
