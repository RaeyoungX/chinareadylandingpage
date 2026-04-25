"use client";

import { startTransition, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { trackEvent } from "@/lib/analytics";

const categoryOptions = [
  { value: "launch", label: "Launch access" },
  { value: "feature", label: "Feature request" },
  { value: "content", label: "Guide content" },
  { value: "bug", label: "Bug report" },
] as const;

type SubmissionState = {
  kind: "idle" | "success" | "error";
  message: string;
};

type FeedbackSectionProps = {
  source?: string;
  className?: string;
  compact?: boolean;
};

const initialState: SubmissionState = {
  kind: "idle",
  message: "",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function FeedbackSection({
  source = "coming_soon",
  className = "",
  compact = false,
}: FeedbackSectionProps) {
  const pathname = usePathname();
  const [state, setState] = useState(initialState);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const category = formData.get("category")?.toString().trim() ?? "";
    const message = formData.get("message")?.toString().trim() ?? "";

    if (!category) {
      setState({
        kind: "error",
        message: "Choose a feedback type so we can route it correctly.",
      });
      return;
    }

    if (message.length < 20) {
      setState({
        kind: "error",
        message: "Please add a bit more detail. Feedback should be at least 20 characters.",
      });
      return;
    }

    if (email && !isValidEmail(email)) {
      setState({
        kind: "error",
        message: "Enter a valid email or leave it blank.",
      });
      return;
    }

    setIsPending(true);
    setState(initialState);

    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.from("feedback_submissions").insert({
        name: name || null,
        email: email || null,
        category,
        message,
        page_path: pathname,
        source,
      });

      if (error) {
        setState({
          kind: "error",
          message: "Submission failed. Check the Supabase table and RLS setup, then try again.",
        });
        setIsPending(false);
        return;
      }

      trackEvent("feedback_submit", { source, category });
      form.reset();
      setState({
        kind: "success",
        message: "Thanks. Your feedback has been saved.",
      });
      setIsPending(false);
    });
  }

  if (compact) {
    return (
      <section
        className={`overflow-hidden rounded-2xl border border-white/10 bg-white/8 p-6 sm:p-7 backdrop-blur-sm ${className}`}
      >
        <h2 className="text-lg font-bold text-white mb-4">
          Share feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            name="category"
            required
            defaultValue=""
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30 focus:bg-white/15 focus:ring-0"
          >
            <option value="" disabled>
              Feedback type
            </option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <textarea
            name="message"
            required
            minLength={20}
            maxLength={1200}
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/30 focus:bg-white/15 focus:ring-0"
            placeholder="What were you expecting to find or do here?"
          />

          <div className="flex items-center justify-between gap-3 pt-1">
            <p
              aria-live="polite"
              className={`text-xs leading-5 ${
                state.kind === "error"
                  ? "text-red-400"
                  : state.kind === "success"
                    ? "text-emerald-400"
                    : "text-transparent"
              }`}
            >
              {state.message || ""}
            </p>
            <button
              type="submit"
              disabled={isPending}
              className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-all hover:bg-slate-100 disabled:bg-white/30 disabled:text-white/50"
            >
              {isPending ? "Sending..." : "Send feedback"}
            </button>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section
      className={`mt-12 overflow-hidden rounded-[2.25rem] border border-slate-200/80 bg-[radial-gradient(circle_at_top_right,_rgba(226,232,240,0.8),_transparent_28%),linear-gradient(180deg,_rgba(248,250,252,0.96)_0%,_rgba(255,255,255,0.98)_100%)] p-6 shadow-[0_30px_80px_rgba(148,163,184,0.12)] sm:p-8 lg:p-10 ${className}`}
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Product feedback
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Tell us what is missing or confusing
            </h2>
            <p className="mt-4 max-w-lg text-base leading-8 text-slate-600">
              Use this form for product feedback only: missing features, confusing steps,
              guide gaps, bugs, or anything that blocked you while trying the website experience.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Guide gaps and missing steps",
                "Bugs, blockers, and confusing flows",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/80 bg-white/85 px-4 py-3 text-sm font-medium text-slate-700 shadow-[0_12px_30px_rgba(226,232,240,0.55)]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/92 p-5 shadow-[0_16px_40px_rgba(226,232,240,0.55)]">
              <p className="text-sm leading-7 text-slate-600">
                Use this form to tell us what to improve. We read every message.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-[2rem] border border-white/80 bg-white/96 p-5 shadow-[0_22px_60px_rgba(226,232,240,0.7)] sm:p-6"
        >
          <div className="mb-1 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Feedback form
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Share what blocked you or what should be clearer before launch.
              </p>
            </div>
            <div className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 sm:block">
              Website feedback
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
                maxLength={120}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                placeholder="Optional"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-800">Feedback type</span>
            <select
              name="category"
              required
              defaultValue=""
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
            >
              <option value="" disabled>
                Select one
              </option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-800">Message</span>
            <textarea
              name="message"
              required
              minLength={20}
              maxLength={1200}
              rows={6}
              className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
              placeholder="What were you expecting to find or do here?"
            />
          </label>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              {state.message || "Tell us which part felt incomplete, confusing, or missing."}
            </p>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-w-[11rem] items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isPending ? "Sending..." : "Send feedback"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
