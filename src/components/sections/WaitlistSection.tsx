"use client";

import { startTransition, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { trackEvent } from "@/lib/analytics";

type WaitlistSectionProps = {
  source: "homepage_hero" | "homepage_waitlist" | "coming_soon";
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  compact?: boolean;
};

type SubmissionState = {
  kind: "idle" | "success" | "error";
  message: string;
};

const initialState: SubmissionState = {
  kind: "idle",
  message: "",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function WaitlistSection({
  source,
  className = "",
  eyebrow = "Launch waitlist",
  title = "Get notified when the app is live",
  description = "The iOS and Android apps are coming soon. Leave your email and we will let you know when downloads open.",
  compact = false,
}: WaitlistSectionProps) {
  const pathname = usePathname();
  const [state, setState] = useState(initialState);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";

    if (!isValidEmail(email)) {
      setState({
        kind: "error",
        message: "Enter a valid email address to join the waitlist.",
      });
      return;
    }

    setIsPending(true);
    setState(initialState);

    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.from("waitlist_signups").insert({
        email,
        name: name || null,
        source,
        page_path: pathname,
      });

      if (error) {
        if (error.code === "23505") {
          setState({
            kind: "success",
            message: "You are already on the waitlist. We will email you when the app launches.",
          });
          setIsPending(false);
          return;
        }

        setState({
          kind: "error",
          message: "Waitlist signup failed. Please try again in a moment.",
        });
        setIsPending(false);
        return;
      }

      trackEvent("waitlist_signup", { source });
      form.reset();
      setState({
        kind: "success",
        message: "You are on the waitlist. We will only email you about launch updates.",
      });
      setIsPending(false);
    });
  }

  if (compact) {
    return (
      <section
        className={`overflow-hidden rounded-2xl border border-white/10 bg-white/8 p-6 sm:p-7 backdrop-blur-sm ${className}`}
      >
        <h2 className="text-lg font-bold text-white mb-4">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <input
            name="email"
            type="email"
            required
            maxLength={120}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/30 focus:bg-white/15 focus:ring-0"
            placeholder="your@email.com"
          />
          <div className="flex items-center justify-between gap-3">
            <p
              aria-live="polite"
              className={`text-xs ${
                state.kind === "error"
                  ? "text-red-400"
                  : state.kind === "success"
                    ? "text-emerald-400"
                    : "text-slate-500"
              }`}
            >
              {state.message || "No spam. Launch alerts only."}
            </p>
            <button
              type="submit"
              disabled={isPending}
              className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-all hover:bg-slate-100 disabled:bg-white/30 disabled:text-white/50"
            >
              {isPending ? "Joining..." : "Join waitlist"}
            </button>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section
      className={`overflow-hidden rounded-[2.25rem] border border-sky-100/80 bg-[radial-gradient(circle_at_top_left,_rgba(191,219,254,0.35),_transparent_32%),linear-gradient(180deg,_rgba(248,251,255,0.98)_0%,_rgba(255,255,255,0.98)_100%)] p-6 shadow-[0_30px_80px_rgba(148,163,184,0.14)] sm:p-8 lg:p-10 ${className}`}
    >
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              {eyebrow}
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-8 text-slate-600">
              {description}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Try the website preview today",
                "Join the waitlist for app launch",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/80 bg-white/85 px-4 py-3 text-sm font-medium text-slate-700 shadow-[0_12px_30px_rgba(226,232,240,0.6)] backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-[1.75rem] border border-sky-100/80 bg-white/92 p-5 shadow-[0_16px_40px_rgba(226,232,240,0.55)]">
              <p className="text-sm leading-7 text-slate-600">
                The website preview is live today. The waitlist is only for launch notifications when the mobile app becomes available.
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                网站预览今天上线。候补名单仅用于移动应用上线时的启动通知。
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/80 bg-white/96 p-5 shadow-[0_22px_60px_rgba(226,232,240,0.7)] sm:p-6"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Pre-launch signup
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Leave your email and we will notify you when the app opens.
              </p>
            </div>
            <div className="hidden rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 sm:block">
              App coming soon
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-800">Name</span>
              <input
                name="name"
                type="text"
                maxLength={80}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                placeholder="Optional"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-800">Email</span>
              <input
                name="email"
                type="email"
                required
                maxLength={120}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                placeholder="name@email.com"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p
              aria-live="polite"
              className={`max-w-md text-sm leading-6 ${
                state.kind === "error"
                  ? "text-red-600"
                  : state.kind === "success"
                    ? "text-emerald-600"
                    : "text-slate-500"
              }`}
            >
              {state.message || "You can try the website now and use the waitlist only for launch alerts."}
            </p>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-w-[11rem] items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isPending ? "Joining..." : "Join waitlist"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
