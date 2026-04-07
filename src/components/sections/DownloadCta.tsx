import Link from "next/link";
import PhoneMockup from "@/components/ui/PhoneMockup";
import { PREVIEW_PATH, WAITLIST_PATH } from "@/lib/constants";

export default function DownloadCta() {
  return (
    <section id="download" className="scroll-mt-20 py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gray-900 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text */}
            <div className="p-8 sm:p-12 lg:p-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-[1.1] mb-4">
                The Mobile App Is
                <br />
                Not Out Yet
              </h2>
              <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed max-w-md">
                Try the website experience today, then join the waitlist to hear when iOS and Android downloads open.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={PREVIEW_PATH} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M8 5a1 1 0 011.555-.832l8 5.5a1 1 0 010 1.664l-8 5.5A1 1 0 018 16V5z"/></svg>
                  Try Web Preview
                </Link>
                <Link href={WAITLIST_PATH} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white text-sm font-medium rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 3a1 1 0 011 1v9.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L11 13.586V4a1 1 0 011-1z"/></svg>
                  Join App Waitlist
                </Link>
              </div>
            </div>

            {/* Phone */}
            <div className="hidden lg:flex justify-center items-end pb-0 pr-8">
              <div className="translate-y-6">
                <PhoneMockup size="md" alt="ChinaReady app preview" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
