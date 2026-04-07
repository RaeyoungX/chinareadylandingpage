import Link from "next/link";
import PhoneMockup from "@/components/ui/PhoneMockup";
import { PREVIEW_PATH, WAITLIST_PATH } from "@/lib/constants";

const heroScreens = {
  left: "/images/app-screenshot-hero.png",
  center: "/images/app-screenshot-dashboard.png",
  right: "/images/app-screenshot-guide.png",
};

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-visible bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold tracking-wide text-slate-500">
              Website preview live
            </span>
            <span className="h-3.5 w-px bg-slate-200" />
            <span className="text-xs font-semibold text-slate-400">
              App coming soon
            </span>
          </div>
        </div>

        <div className="mx-auto mb-6 max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-[5.5rem]">
            Everything travelers need before landing in China
          </h1>
        </div>

        <div className="mx-auto mb-3 max-w-xl text-center">
          <p className="text-lg leading-relaxed text-slate-500 sm:text-xl">
            Built from official sources and real traveler experience.
          </p>
        </div>

        <div className="mx-auto mb-10 max-w-xl text-center">
          <p className="text-sm text-slate-400">
            Use the website now. The app is coming soon.
          </p>
        </div>

        <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:mb-20">
          <Link
            href={PREVIEW_PATH}
            className="inline-flex items-center rounded-full bg-slate-950 px-7 py-3.5 text-sm font-medium text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)] transition-all hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Try the Web Preview
          </Link>
          <Link
            href={WAITLIST_PATH}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
          >
            Join the waitlist
          </Link>
        </div>

        <div className="relative flex items-end justify-center pb-12 sm:pb-16">
          {/* Left phone */}
          <div className="hidden sm:block relative z-0"
            style={{ transform: "rotate(-8deg) translateY(40px) translateX(8px)", transformOrigin: "bottom center" }}>
            <div className="scale-[1.28] opacity-75">
              <PhoneMockup size="sm" src={heroScreens.left} alt="ChinaReady onboarding screen" />
            </div>
          </div>

          {/* Center phone */}
          <div className="relative z-10 scale-[1.14]">
            <PhoneMockup size="lg" src={heroScreens.center} alt="ChinaReady readiness dashboard" />
          </div>

          {/* Right phone */}
          <div className="hidden sm:block relative z-0"
            style={{ transform: "rotate(8deg) translateY(40px) translateX(-8px)", transformOrigin: "bottom center" }}>
            <div className="scale-[1.28] opacity-75">
              <PhoneMockup size="sm" src={heroScreens.right} alt="ChinaReady transport setup guide" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
