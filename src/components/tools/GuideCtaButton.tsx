"use client";

import { trackEvent } from "@/lib/analytics";
import { APP_STORE_URL } from "@/lib/constants";

export default function GuideCtaButton({ slug }: { slug: string }) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("guide_cta_click", { slug })}
      className="mt-6 inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 shadow-lg hover:bg-slate-100 transition"
    >
      Download the app
    </a>
  );
}
