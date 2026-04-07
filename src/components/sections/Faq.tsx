"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/faqs";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">FAQ</p>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Common questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white overflow-hidden transition-shadow hover:shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-gray-900 sm:text-base">
                    {faq.q}
                  </span>
                  <span className="shrink-0 text-gray-400">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed text-gray-500">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
