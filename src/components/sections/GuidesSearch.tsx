"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Guide } from "@/lib/guides";
import { categoryLabels, categoryColors } from "@/lib/guides";

export default function GuidesSearch({ guides }: { guides: Guide[] }) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? guides.filter((g) => {
        const q = query.toLowerCase();
        return (
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          categoryLabels[g.category].toLowerCase().includes(q)
        );
      })
    : guides;

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-8">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search guides…"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-[0_1px_4px_rgba(15,23,42,0.06)] focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 transition"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Results count */}
      {query.trim() && (
        <p className="mb-5 text-sm text-slate-400">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
        </p>
      )}

      {/* Guide grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_2px_16px_rgba(15,23,42,0.07)] transition hover:shadow-[0_8px_32px_rgba(15,23,42,0.12)] hover:-translate-y-0.5"
            >
              {guide.coverImage ? (
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={guide.coverImage}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-left-top transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <div className="w-full bg-slate-100" style={{ aspectRatio: "16/9" }} />
              )}
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-base font-bold text-slate-900 leading-snug mb-2">
                  {guide.title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                  {guide.description}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {new Date(guide.publishedAt).toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-sm font-semibold text-sky-700 inline-flex items-center gap-0.5 transition-transform group-hover:translate-x-0.5">
                    Read guide →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-slate-400 text-sm">No guides found for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
