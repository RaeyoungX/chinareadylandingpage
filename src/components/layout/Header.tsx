"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { PREVIEW_PATH, WAITLIST_PATH, NAV_LINKS } from "@/lib/constants";
import LogoMark from "@/components/ui/LogoMark";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100/80 bg-white/82 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-6">
        <div className="flex h-[76px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark size={44} priority />
            <span className="text-[1.05rem] font-semibold tracking-tight text-slate-950">
              ChinaReady
            </span>
          </Link>

          <nav className="hidden items-center rounded-full border border-slate-200/80 bg-white/90 px-3 py-2 shadow-[0_12px_30px_rgba(15,23,42,0.04)] md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={WAITLIST_PATH}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
            >
              App launch
            </Link>
            <Link
              href={PREVIEW_PATH}
              className="inline-flex items-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white shadow-[0_14px_32px_rgba(15,23,42,0.12)] transition-all hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Try preview
            </Link>
          </div>

          <button
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="mt-1 rounded-[1.5rem] border border-slate-200/80 bg-white p-3 shadow-[0_20px_40px_rgba(15,23,42,0.06)] md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 grid gap-2 px-1">
                <Link
                  href={WAITLIST_PATH}
                  className="flex items-center justify-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700"
                >
                  App launch
                </Link>
                <Link
                  href={PREVIEW_PATH}
                  className="flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white"
                >
                  Try preview
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
