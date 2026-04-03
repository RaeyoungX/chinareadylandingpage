import Link from "next/link";
import FeedbackSection from "@/components/sections/FeedbackSection";

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_38%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_48%,_#eef2ff_100%)]">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="w-full overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-[0_28px_90px_rgba(15,23,42,0.12)] backdrop-blur sm:p-12">
          <div className="mb-6 inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
            ChinaReady download
          </div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Coming soon
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            The iOS and Android apps are not publicly available yet. We are preparing the first release and polishing the onboarding flow.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            For now, you can keep exploring the preview and product walkthrough on the landing page.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Back to homepage
            </Link>
            <Link
              href="/preview"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              View app preview
            </Link>
          </div>

          <FeedbackSection />
        </section>
      </div>
    </main>
  );
}
