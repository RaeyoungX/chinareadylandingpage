"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export default function ScrollDepthTracker({ slug }: { slug: string }) {
  const fired = useRef(new Set<number>());

  useEffect(() => {
    const milestones = [25, 50, 75, 100];

    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const pct = Math.round((scrolled / total) * 100);

      for (const m of milestones) {
        if (pct >= m && !fired.current.has(m)) {
          fired.current.add(m);
          trackEvent("scroll_depth", { percent: m, slug });
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return null;
}
