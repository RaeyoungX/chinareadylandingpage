"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "The readiness checklist saved me so much stress. I had WeChat Pay and my VPN set up before I even boarded.",
    name: "Sarah K",
    role: "Solo Traveler",
    color: "bg-blue-200",
  },
  {
    quote: "I had no idea you couldn't download VPN apps inside China. ChinaReady warned me just in time — absolute lifesaver.",
    name: "James L",
    role: "Business Traveler",
    color: "bg-green-200",
  },
  {
    quote: "The step-by-step WeChat Pay guide was so clear. My first cashless payment in Shanghai felt completely natural.",
    name: "Marcus T",
    role: "Digital Nomad",
    color: "bg-orange-200",
  },
  {
    quote: "As a student heading to Beijing, the visa document checklist and community tips made everything so much easier.",
    name: "Emily W",
    role: "Student",
    color: "bg-purple-200",
  },
  {
    quote: "The community section is gold — real travelers sharing which eSIM actually works and which restaurants accept foreign cards.",
    name: "David R",
    role: "Food Explorer",
    color: "bg-rose-200",
  },
];

export default function Showcase() {
  const [active, setActive] = useState(2);

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-gray-900 fill-gray-900" />
              <span className="text-sm font-medium text-gray-500">Social Proof</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {"Trips Powered"}
              <br />
              {"by "}
              <span className="text-gray-400">{"Real Travelers"}</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-sm mt-4 lg:mt-0 leading-relaxed">
            Discover how travelers from around the world used ChinaReady to land in China fully prepared.
          </p>
        </div>

        {/* Testimonial cards carousel */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-4 mb-12 min-h-[360px]">
          {testimonials.map((t, i) => {
            const offset = i - active;
            const absOffset = Math.abs(offset);
            const isActive = i === active;

            if (absOffset > 2) return null;

            return (
              <div
                key={i}
                className="absolute transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(${offset * 160}px) scale(${isActive ? 1 : 0.8 - absOffset * 0.05})`,
                  zIndex: isActive ? 10 : 5 - absOffset,
                  opacity: isActive ? 1 : 0.4 - absOffset * 0.1,
                  filter: isActive ? "none" : "grayscale(100%)",
                }}
              >
                <div
                  className={`w-[260px] sm:w-[300px] rounded-2xl overflow-hidden ${
                    isActive ? "shadow-2xl" : "shadow-lg"
                  }`}
                  style={{ height: isActive ? "340px" : "300px" }}
                >
                  {/* Avatar area */}
                  <div className={`${t.color} h-[55%] relative flex items-center justify-center`}>
                    <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-3xl font-bold text-white/80">
                      {t.name.charAt(0)}
                    </div>
                  </div>
                  {/* Quote area */}
                  <div className="bg-white h-[45%] p-4 flex flex-col justify-between">
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed italic">
                      {`"${t.quote}"`}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`w-7 h-7 rounded-full ${t.color} flex items-center justify-center text-xs font-bold text-white/80`}>
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-900">{t.name}</div>
                        <div className="text-[10px] text-gray-400">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
