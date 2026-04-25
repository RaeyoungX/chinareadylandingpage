"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type State = Partial<Record<"purpose" | "wifi" | "work_needs" | "ai" | "streaming", string>>;

const QUESTIONS = [
  {
    key: "purpose" as const,
    text: "What's the main reason you're going to China?",
    options: [
      { value: "tourist",  label: "Tourist / short trip" },
      { value: "work",     label: "Work / business travel" },
      { value: "remote",   label: "Remote work / digital nomad" },
      { value: "longterm", label: "Long stay (1 month+)" },
    ],
  },
  {
    key: "wifi" as const,
    text: "Will you use hotel, Airbnb, or office Wi-Fi?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no",  label: "No — mostly on phone data" },
    ],
  },
  {
    key: "work_needs" as const,
    text: "Do you need any of these for work?",
    options: [
      { value: "none",      label: "None of these" },
      { value: "calls",     label: "Zoom / Teams / Google Meet" },
      { value: "corporate", label: "Company VPN / internal tools" },
      { value: "both",      label: "Both calls and company VPN" },
    ],
  },
  {
    key: "ai" as const,
    text: "Do you need ChatGPT, Claude, or Gemini?",
    options: [
      { value: "no",         label: "No" },
      { value: "occasional", label: "Occasionally" },
      { value: "daily",      label: "Daily — part of my workflow" },
    ],
  },
  {
    key: "streaming" as const,
    text: "Do you need streaming or region-specific content?",
    options: [
      { value: "no",      label: "No" },
      { value: "yes",     label: "Yes (Netflix, BBC iPlayer, etc.)" },
      { value: "tiktok",  label: "Yes, and I post to TikTok" },
    ],
  },
];

interface Result {
  verdict: "esim" | "esim-light-vpn" | "esim-vpn" | "vpn-critical" | "complex";
  tag: string;
  title: string;
  sections: { heading: string; body: string }[];
}

function getResult(s: State): Result | null {
  if (QUESTIONS.some(q => s[q.key] === undefined)) return null;

  const { purpose: p, wifi, work_needs: work, ai, streaming } = s;

  if (streaming === "tiktok") return {
    verdict: "complex", tag: "Complex setup",
    title: "TikTok posting from China is a multi-layer problem",
    sections: [
      { heading: "Why VPN alone won't fix it", body: "TikTok checks SIM country code, IP address, GPS, and Apple/Google account region simultaneously. Any one pointing to China triggers restrictions, even with a working VPN." },
      { heading: "What actually works", body: "You need all of these: no Chinese SIM, Apple/Google account region set outside China, an eSIM routed through HK or Singapore, and the TikTok app downloaded before you arrive. For serious creators, a dedicated secondary phone locked to your home region is the most reliable setup." },
      { heading: "VPN still useful for", body: "Unblocking hotel Wi-Fi, ChatGPT access, and streaming. Use a reliable paid VPN — free VPNs in China are consistently unreliable." },
    ],
  };

  if (work === "corporate" || work === "both") return {
    verdict: "vpn-critical", tag: "VPN critical",
    title: "You need a reliable VPN — and eSIM as backup",
    sections: [
      { heading: "Corporate VPN situation", body: "Your company's VPN runs over the open internet, through the GFW. Some protocols (especially IKEv2 and L2TP) get disrupted. Ask your IT team if the VPN uses obfuscation and if colleagues have used it from China recently." },
      { heading: "Personal VPN on top", body: "Even if your corporate VPN works, add a personal VPN as fallback. Astrill ($12.50/month) has the strongest track record for work-critical use in China. LetsVPN (~$6/month) is a solid secondary option. Buy and install both before you travel — VPN provider sites are blocked in China." },
      { heading: "eSIM recommendation", body: "Get a roaming eSIM (Nomad APAC, Jetpac, or Trip.com eSIM) as your primary connection. A clean overseas IP makes your VPN more stable than running it over hotel Wi-Fi." },
      { heading: "Video calls", body: "Zoom and Teams have China servers and generally work without VPN. Google Meet requires one. Test on day one — don't wait until an important call." },
    ],
  };

  if (p === "remote" || p === "longterm") return {
    verdict: "vpn-critical", tag: "VPN recommended",
    title: "For remote work, a reliable VPN is worth paying for",
    sections: [
      { heading: "eSIM as your base", body: "A roaming eSIM (Nomad APAC, Jetpac, or Trip.com eSIM) gives you a stable overseas connection. For a long stay, budget $20–40/month for data — this covers most daily use without any VPN." },
      { heading: "VPN for the rest", body: `You'll eventually need Wi-Fi in co-working spaces or apartments. Astrill ($12.50/month) is the most consistently reliable for long-term stays. LetsVPN (~$6/month) works well at lower cost. ${ai === "daily" ? "For daily AI tool use, make sure your VPN exits outside Hong Kong — OpenAI blocks HK IPs." : ""} Install and test before you arrive.` },
      { heading: "Video calls", body: "Zoom and Teams usually work without VPN. Google Meet requires one. Test your setup on arrival day." },
      { heading: "What to avoid", body: "Free VPNs are unreliable in China. Buy from providers with a refund policy and test within the first few days." },
    ],
  };

  if (wifi === "yes" && ai === "daily") return {
    verdict: "esim-vpn", tag: "eSIM + VPN",
    title: "You need eSIM + VPN",
    sections: [
      { heading: "eSIM for your phone", body: "A roaming eSIM (Airalo, Nomad APAC, Holafly, or Trip.com eSIM) gives you internet on arrival instantly. Use it for maps, messaging, social media, and your hotspot." },
      { heading: "VPN for Wi-Fi and AI tools", body: "Hotel Wi-Fi goes through Chinese ISPs — you need a VPN to unblock it. OpenAI also blocks Hong Kong IPs (where most eSIMs exit), so ChatGPT needs a VPN too. LetsVPN (~$6/month) works well for tourists. Install before you go." },
      { heading: "AI tool note", body: "ChatGPT and Claude need a non-HK, non-CN exit. A VPN with US or EU servers solves this." },
    ],
  };

  if (wifi === "yes") return {
    verdict: "esim-light-vpn", tag: "eSIM + light VPN",
    title: "eSIM primary — add a lightweight VPN for Wi-Fi",
    sections: [
      { heading: "eSIM covers most things", body: "A roaming eSIM handles Google, Instagram, WhatsApp, and YouTube on your phone. For most tourists this covers 90% of what they need." },
      { heading: "VPN only on Wi-Fi", body: `Hotel and Airbnb Wi-Fi needs a VPN to unblock apps. LetsVPN weekly ($1.50) or monthly ($6) is enough for a short trip — pay via Alipay after arrival if you've set it up. Install the app before you go.${ai === "occasional" ? " It also handles occasional AI access." : ""}` },
    ],
  };

  if (ai !== "no") return {
    verdict: "esim-light-vpn", tag: "eSIM + light VPN",
    title: "eSIM primary — add a VPN only for AI tools",
    sections: [
      { heading: "eSIM handles everything else", body: "A roaming eSIM covers Google, Instagram, WhatsApp, and maps. Most travelers on phone data don't need a VPN at all." },
      { heading: "The ChatGPT exception", body: "Most eSIMs exit through Hong Kong, and OpenAI blocks HK IPs. Two options: (a) an eSIM that explicitly exits outside HK — some Nomad and Trip.com eSIM plans flag this, or (b) any eSIM + LetsVPN weekly ($1.50 via Alipay). Option (b) is more flexible." },
    ],
  };

  if (streaming === "yes") return {
    verdict: "esim-light-vpn", tag: "eSIM + light VPN",
    title: "eSIM primary — add a VPN for streaming",
    sections: [
      { heading: "eSIM for daily use", body: "A roaming eSIM handles Google, social media, and messaging without any setup." },
      { heading: "VPN for streaming", body: "Netflix US, BBC iPlayer, and Disney+ need a VPN with the right country exit. LetsVPN (~$6/month) or Astrill ($12.50/month) both support streaming. Note: streaming uses heavy data — plan your eSIM budget accordingly." },
    ],
  };

  return {
    verdict: "esim", tag: "eSIM only",
    title: "You don't need a VPN. One eSIM is enough.",
    sections: [
      { heading: "Why eSIM works", body: "International roaming eSIMs exit overseas — their traffic never enters the GFW's scope. You get Google, Instagram, WhatsApp, YouTube, and maps without any VPN." },
      { heading: "What to get", body: "Airalo \"China + Hong Kong\" (~$5, must include Hong Kong) for trips up to 7 days. Nomad APAC ($9–22) or Trip.com eSIM for longer trips. Install before you board." },
      { heading: "Just in case", body: "If you end up on hotel Wi-Fi frequently, LetsVPN (~$6/month) is easy to add via Alipay — install the app before you go just in case." },
    ],
  };
}

const verdictStyle: Record<string, { bg: string; border: string; labelColor: string; titleColor: string; bodyColor: string; divider: string }> = {
  esim:             { bg: "bg-emerald-50", border: "border-emerald-100", labelColor: "text-emerald-600 ring-emerald-100 bg-emerald-50", titleColor: "text-emerald-900", bodyColor: "text-emerald-800", divider: "divide-emerald-100" },
  "esim-light-vpn": { bg: "bg-sky-50",     border: "border-sky-100",     labelColor: "text-sky-600 ring-sky-100 bg-sky-50",             titleColor: "text-sky-900",     bodyColor: "text-sky-800",     divider: "divide-sky-100" },
  "esim-vpn":       { bg: "bg-sky-50",     border: "border-sky-100",     labelColor: "text-sky-600 ring-sky-100 bg-sky-50",             titleColor: "text-sky-900",     bodyColor: "text-sky-800",     divider: "divide-sky-100" },
  "vpn-critical":   { bg: "bg-slate-50",   border: "border-slate-200",   labelColor: "text-slate-600 ring-slate-200 bg-slate-100",      titleColor: "text-slate-900",   bodyColor: "text-slate-700",   divider: "divide-slate-200" },
  complex:          { bg: "bg-amber-50",   border: "border-amber-100",   labelColor: "text-amber-700 ring-amber-100 bg-amber-50",       titleColor: "text-amber-900",   bodyColor: "text-amber-800",   divider: "divide-amber-100" },
};

export default function EsimVpnChecker() {
  const [state, setState] = useState<State>({});
  const [step, setStep] = useState(0);

  const currentQ = QUESTIONS[step];
  const result = getResult(state);
  const style = result ? verdictStyle[result.verdict] : null;
  const isComplete = QUESTIONS.every(q => state[q.key] !== undefined);

  const handleAnswer = (key: typeof currentQ.key, val: string) => {
    const next = { ...state, [key]: val };
    setState(next);
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 200);
    } else {
      const finalResult = getResult(next);
      trackEvent("esim_vpn_check", {
        purpose: next.purpose ?? "",
        wifi: next.wifi ?? "",
        work_needs: next.work_needs ?? "",
        ai: next.ai ?? "",
        streaming: next.streaming ?? "",
        verdict: finalResult?.verdict ?? "",
      });
    }
  };

  const reset = () => { setState({}); setStep(0); };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10 space-y-4">

      {/* Question card */}
      {!isComplete ? (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)] overflow-hidden">
          {/* Progress bar */}
          <div className="h-1 bg-slate-100">
            <div
              className="h-full bg-slate-900 transition-all duration-300"
              style={{ width: `${((step) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <div className="px-6 pt-6 pb-2">
            <p className="text-xs text-slate-400 mb-1">Question {step + 1} of {QUESTIONS.length}</p>
            <p className="text-base font-semibold text-slate-900 leading-snug">{currentQ.text}</p>
          </div>

          <div className="p-4 grid grid-cols-2 gap-2">
            {currentQ.options.map(opt => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(currentQ.key, opt.value)}
                className={`rounded-xl border py-3 px-4 text-sm text-left transition-all leading-snug ${
                  state[currentQ.key] === opt.value
                    ? "border-slate-900 bg-slate-950 text-white font-medium shadow-[0_2px_8px_rgba(15,23,42,0.18)]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Previous answers */}
          {step > 0 && (
            <div className="px-6 pb-5">
              <div className="flex flex-wrap gap-2">
                {QUESTIONS.slice(0, step).map((q, i) => (
                  <button
                    key={q.key}
                    onClick={() => setStep(i)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-500 hover:border-slate-300 transition-colors"
                  >
                    <span className="text-slate-400">{i + 1}.</span>
                    {q.options.find(o => o.value === state[q.key])?.label}
                    <span className="text-slate-300">✕</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Summary pills when complete */
        <div className="flex flex-wrap gap-2 items-center">
          {QUESTIONS.map((q, i) => (
            <button
              key={q.key}
              onClick={() => setStep(i)}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 hover:border-slate-300 shadow-sm transition-colors"
            >
              <span className="text-slate-400">{i + 1}.</span>
              {q.options.find(o => o.value === state[q.key])?.label}
            </button>
          ))}
          <button onClick={reset} className="text-xs text-slate-400 hover:text-slate-600 transition-colors ml-1">
            Start over
          </button>
        </div>
      )}

      {/* Result */}
      {result && style && (
        <div className={`rounded-2xl border ${style.border} ${style.bg} overflow-hidden`}>
          <div className={`px-6 py-5 border-b ${style.border}`}>
            <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 mb-3 ${style.labelColor}`}>
              {result.tag}
            </span>
            <p className={`text-lg font-bold leading-snug ${style.titleColor}`}>{result.title}</p>
          </div>
          <div className={`divide-y ${style.divider}`}>
            {result.sections.map((sec, i) => (
              <div key={i} className="px-6 py-4">
                <p className={`text-xs font-semibold uppercase tracking-wider mb-1.5 ${style.labelColor}`}>{sec.heading}</p>
                <p className={`text-sm leading-relaxed ${style.bodyColor}`}>{sec.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coverage reference — collapsed by default */}
      <details className="group rounded-2xl border border-slate-100 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)] overflow-hidden">
        <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
          <p className="text-sm font-medium text-slate-700">What does each tool actually cover?</p>
          <span className="text-slate-400 text-xs group-open:rotate-180 transition-transform inline-block">▾</span>
        </summary>
        <div className="border-t border-slate-50">
          <div className="grid grid-cols-3 divide-x divide-slate-50">
            {[
              { dot: "bg-emerald-400", heading: "eSIM only", sub: "VPN can't replace", items: ["Mobile data", "Zero setup", "Bypasses GFW via overseas exit"] },
              { dot: "bg-slate-400",   heading: "Either works", sub: "eSIM usually simpler", items: ["Google / Gmail", "Instagram / WhatsApp", "YouTube on mobile", "ChatGPT *", "Phone hotspot"] },
              { dot: "bg-sky-400",     heading: "VPN only", sub: "eSIM can't replace", items: ["Hotel / office Wi-Fi", "Specific country IP", "Corporate VPN", "Non-eSIM devices"] },
            ].map(col => (
              <div key={col.heading} className="p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className={`h-2 w-2 rounded-full shrink-0 ${col.dot}`} />
                  <p className="text-xs font-bold text-slate-800">{col.heading}</p>
                </div>
                <p className="text-[11px] text-slate-400 mb-2 pl-3.5">{col.sub}</p>
                <ul className="space-y-1.5 pl-3.5">
                  {col.items.map(item => <li key={item} className="text-xs text-slate-500">{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="px-5 py-3 text-[11px] text-slate-400 border-t border-slate-50">
            * ChatGPT is blocked on Hong Kong IPs by OpenAI (not the GFW). Most eSIMs exit via HK — check the exit region or add a VPN if you need AI tools.
          </p>
        </div>
      </details>

      <p className="text-[11px] text-slate-400 leading-relaxed px-1">
        No affiliate links. Recommendations are based on reported reliability in China — always verify closer to your travel date as conditions change.
      </p>
    </div>
  );
}
