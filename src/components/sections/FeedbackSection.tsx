"use client";

import { startTransition, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

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

      form.reset();
      setState({
        kind: "success",
        message: "Thanks. Your feedback has been saved.",
      });
      setIsPending(false);
    });
  }

  return (
    <section className={`mt-12 grid gap-8 rounded-[2rem] border border-slate-200/80 bg-slate-50/90 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] ${className}`}>
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-700">
          Product feedback
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          Tell us what you need before launch
        </h2>
        <p className="mt-4 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
          Feedback goes straight into Supabase. Use this to tell us what blocked you,
          what feature matters most, or what should ship first.
        </p>
        <div className="mt-6 rounded-2xl border border-sky-100 bg-white p-4 text-sm leading-6 text-slate-600">
          Useful examples: TestFlight interest, Android availability, visa guide gaps,
          payment setup pain points, or anything confusing in the current product preview.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-800">Name</span>
            <input
              name="name"
              type="text"
              maxLength={80}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="Optional"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-800">Email</span>
            <input
              name="email"
              type="email"
              maxLength={120}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
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
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
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
            className="w-full rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="What were you expecting to find or do here?"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            aria-live="polite"
            className={`text-sm ${
              state.kind === "error"
                ? "text-red-600"
                : state.kind === "success"
                  ? "text-emerald-600"
                  : "text-slate-500"
            }`}
          >
            {state.message || "Anonymous submissions are allowed. Add your email only if you want a follow-up."}
          </p>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isPending ? "Sending..." : "Send feedback"}
          </button>
        </div>
      </form>
    </section>
  );
}
