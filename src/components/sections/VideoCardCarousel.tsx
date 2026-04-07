"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

type DemoCard = {
  id: string;
  title: string;
  subtitle: string;
  videoSrc: string;
  tags?: string[];
};

const demoCards: DemoCard[] = [
  {
    id: "setup-walkthrough",
    title: "Setup walkthrough",
    subtitle: "Getting started",
    videoSrc: "/videos/demo/setup.mp4",
    tags: ["onboarding", "checklist"],
  },
  {
    id: "community-preview",
    title: "Browse community tips",
    subtitle: "Community",
    videoSrc: "/videos/demo/comm.mp4",
    tags: ["traveler notes", "tips"],
  },
  {
    id: "rules-preview",
    title: "Check official entry rules",
    subtitle: "Official sources",
    videoSrc: "/videos/demo/rules.mp4",
    tags: ["official links", "visa-free", "arrival"],
  },
];

const TOTAL = demoCards.length;
const wrapIndex = (i: number) => ((i % TOTAL) + TOTAL) % TOTAL;

function VideoDevice({
  card,
  isActive,
  compact = false,
}: {
  card: DemoCard;
  isActive: boolean;
  compact?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || failed) return;
    if (isActive) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [isActive, failed]);

  return (
    <article
      className={
        compact
          ? "w-[220px]"
          : "w-full max-w-[360px] sm:max-w-[390px] mx-auto"
      }
    >
      <div className="rounded-[2.6rem] bg-[linear-gradient(180deg,#374151_0%,#111827_100%)] p-[4px] shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
        <div className="rounded-[2.45rem] bg-[linear-gradient(180deg,#1f2937_0%,#0f172a_100%)] p-[8px]">
          <div className="relative overflow-hidden rounded-[2.15rem] bg-black aspect-[9/19.5]">
            {!failed ? (
              <video
                ref={videoRef}
                src={card.videoSrc}
                className="h-full w-full object-cover object-top"
                muted
                loop
                playsInline
                preload="auto"
                onError={() => setFailed(true)}
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_45%),linear-gradient(180deg,#0f172a_0%,#111827_100%)]">
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-center pb-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm backdrop-blur">
                    <Play className="h-3.5 w-3.5" />
                    Preview unavailable
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {!compact && (
        <div className="mt-5 px-4 text-center">
          <p className="text-2xl font-semibold tracking-tight text-slate-950">
            {card.title}
          </p>
          <p className="mt-1 text-sm text-slate-500">{card.subtitle}</p>
          {card.tags?.length ? (
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </article>
  );
}

export default function VideoCardCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [animKey, setAnimKey] = useState(0);
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const clearAdvance = () => {
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
  };

  const startAdvance = () => {
    clearAdvance();
    autoAdvanceRef.current = setInterval(() => {
      setDirection("right");
      setActiveIndex((i) => wrapIndex(i + 1));
      setAnimKey((k) => k + 1);
    }, 6000);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { startAdvance(); return clearAdvance; }, []);

  const prevIndex = wrapIndex(activeIndex - 1);
  const nextIndex = wrapIndex(activeIndex + 1);

  const go = (newIndex: number, dir: "left" | "right") => {
    if (newIndex === activeIndex) return;
    setDirection(dir);
    setActiveIndex(newIndex);
    setAnimKey((k) => k + 1);
    startAdvance();
  };

  const prev = () => go(prevIndex, "left");
  const next = () => go(nextIndex, "right");

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    clearAdvance();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(diff) > 80) {
      if (diff < 0) next();
      else prev();
    } else {
      startAdvance();
    }
  };

  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-700">
            Product in motion
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            See the workflow before the app launches
          </h2>
        </div>

        <p className="sr-only" aria-live="polite">
          Demo {activeIndex + 1} of {TOTAL}: {demoCards[activeIndex].title}
        </p>

        <div
          className="relative mt-16"
          style={{ touchAction: "pan-y" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Side cards — desktop only */}
          <div className="absolute inset-0 hidden lg:block" aria-hidden>
            <div className="absolute left-1/2 top-1/2 -translate-x-[150%] -translate-y-1/2 opacity-40 transition-opacity duration-300">
              <VideoDevice card={demoCards[prevIndex]} isActive={false} compact />
            </div>
            <div className="absolute left-1/2 top-1/2 translate-x-[50%] -translate-y-1/2 opacity-40 transition-opacity duration-300">
              <VideoDevice card={demoCards[nextIndex]} isActive={false} compact />
            </div>
          </div>

          {/* Center card — direction-aware slide animation on each navigation */}
          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="relative">
              <div
                key={animKey}
                className={
                  direction === "right"
                    ? "animate-slide-from-right"
                    : "animate-slide-from-left"
                }
              >
                <VideoDevice card={demoCards[activeIndex]} isActive />
              </div>

              <button
                type="button"
                onClick={prev}
                className="absolute left-[-18px] top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_14px_32px_rgba(15,23,42,0.14)] transition hover:text-slate-950 lg:flex"
                aria-label="Previous product demo"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-[-18px] top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_14px_32px_rgba(15,23,42,0.14)] transition hover:text-slate-950 lg:flex"
                aria-label="Next product demo"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={prev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm"
              aria-label="Previous product demo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm"
              aria-label="Next product demo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {demoCards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                onClick={() =>
                  go(index, index > activeIndex ? "right" : "left")
                }
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-9 bg-[#1f433a]"
                    : "w-2.5 bg-slate-300"
                }`}
                aria-label={`Go to demo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
