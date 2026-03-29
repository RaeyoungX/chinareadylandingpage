import { FEATURES } from "@/lib/constants";
import {
  FileText,
  Globe,
  Map,
  Train,
  Shield,
  Building,
  CreditCard,
  MessageSquare,
  BookOpen,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  FileText, Globe, Map, Train, Shield, Building, CreditCard, MessageSquare, BookOpen,
};

const colorMap: Record<string, string> = {
  FileText: "bg-amber-50 text-amber-600",
  Globe: "bg-purple-50 text-purple-600",
  Map: "bg-emerald-50 text-emerald-600",
  Train: "bg-red-50 text-red-500",
  Shield: "bg-rose-50 text-rose-500",
  Building: "bg-teal-50 text-teal-600",
  CreditCard: "bg-blue-50 text-blue-600",
  MessageSquare: "bg-sky-50 text-sky-600",
  BookOpen: "bg-indigo-50 text-indigo-600",
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-gray-50 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium text-primary">How It Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              From Planning to
              <br />
              Prepared in Minutes
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-sm mt-4 lg:mt-0 leading-relaxed">
            Track your readiness across every category — follow step-by-step guides to get fully prepared before you board.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon] || FileText;
            const color = colorMap[feature.icon] || "bg-gray-50 text-gray-600";
            return (
              <div
                key={feature.title}
                className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-300 font-mono">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                  {feature.title}
                  {feature.urgent && (
                    <span className="ml-2 inline-block bg-red-50 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                      Urgent
                    </span>
                  )}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Download buttons */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <a href="#download" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Download iOS
          </a>
          <a href="#download" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.396 13l2.302-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z"/></svg>
            Download Android
          </a>
        </div>
      </div>
    </section>
  );
}
