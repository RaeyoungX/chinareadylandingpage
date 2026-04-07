import Link from "next/link";
import { PREVIEW_PATH, WAITLIST_PATH } from "@/lib/constants";
import {
  ClipboardList,
  BookOpen,
  WifiOff,
  Wrench,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    phase: "Before you book",
    title: "Answer a short questionnaire",
    description:
      "Tell us your trip type, duration, and what you already have set up. We generate a personalized checklist — no generic advice, just what you actually need.",
    pills: ["Visa type", "Payment apps", "Connectivity"],
    color: "bg-violet-50 text-violet-600",
    accent: "border-violet-100",
  },
  {
    icon: BookOpen,
    phase: "Before you land",
    title: "Check the rules and entry requirements",
    description:
      "Visa-free countries, arrival documents, customs limits, and what you can't bring in. Updated when policy changes — not six months later.",
    pills: ["Entry rules", "Customs limits", "Visa-free list"],
    color: "bg-amber-50 text-amber-600",
    accent: "border-amber-100",
  },
  {
    icon: WifiOff,
    phase: "After you land",
    title: "Fix problems — even without internet",
    description:
      "Payments failing, apps blocked, eSIM not connecting. The quick-fix guides work offline so you can solve problems the moment they happen.",
    pills: ["Offline access", "Payment fixes", "VPN fallback"],
    color: "bg-rose-50 text-rose-500",
    accent: "border-rose-100",
  },
  {
    icon: Wrench,
    phase: "While you're there",
    title: "Use the built-in travel tools",
    description:
      "Menu translator, traveler community tips by city, transport shortcuts, and more. Practical tools for the day-to-day — not just the setup.",
    pills: ["Menu translator", "City tips", "Transport"],
    color: "bg-emerald-50 text-emerald-600",
    accent: "border-emerald-100",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-[1.1] max-w-xl">
            From questionnaire to fully prepared
          </h2>
        </div>

        {/* Workflow */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className={`relative rounded-2xl border bg-white p-6 ${step.accent}`}
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-2 top-8 z-10 hidden h-px w-4 border-t border-dashed border-gray-200 lg:block" />
                )}

                <div className="mb-5 flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-gray-300">{String(i + 1).padStart(2, "0")}</span>
                </div>

                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  {step.phase}
                </p>
                <h3 className="text-base font-bold text-gray-900 leading-snug mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {step.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {step.pills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-500 ring-1 ring-gray-200"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3 mt-12">
          <Link
            href={PREVIEW_PATH}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            Explore Preview
          </Link>
          <Link
            href={WAITLIST_PATH}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:border-gray-300 transition-all"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </section>
  );
}
