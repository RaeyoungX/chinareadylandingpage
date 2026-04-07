import type { Metadata } from "next";
import Link from "next/link";
import WaitlistSection from "@/components/sections/WaitlistSection";
import FeedbackSection from "@/components/sections/FeedbackSection";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "App Launch Waitlist",
  description:
    "Join the ChinaReady app waitlist and get notified when the iOS and Android apps launch.",
  alternates: {
    canonical: `${SITE_URL}/coming-soon`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32">

        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-xs font-semibold text-gray-500">App in development</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            The app is coming soon
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-500 max-w-md mx-auto">
            The website is live today. Leave your email and we will notify you once iOS and Android downloads open.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/preview"
              className="inline-flex items-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Try the web preview
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300"
            >
              Back to home
            </Link>
          </div>
        </div>

        {/* Forms */}
        <div className="space-y-4">
          <WaitlistSection
            source="coming_soon"
            compact
            eyebrow="App waitlist"
            title="Get notified when the app launches"
            description=""
          />
          <FeedbackSection source="coming_soon" compact />
        </div>

      </div>
    </main>
  );
}
