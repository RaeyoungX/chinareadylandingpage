"use client";

import {
  FileText,
  Globe,
  Map,
  Train,
  Shield,
  Building,
  CreditCard,
  MessageSquare,
} from "lucide-react";

const features = [
  { icon: FileText, label: "Visa & Entry" },
  { icon: CreditCard, label: "Payments" },
  { icon: Globe, label: "Apps & Internet" },
  { icon: Train, label: "Transport" },
  { icon: Map, label: "Navigation" },
  { icon: Building, label: "Where to Stay" },
  { icon: Shield, label: "Safety Tips" },
  { icon: MessageSquare, label: "Traveler Insights" },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-20 bg-transparent pt-10 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-widest text-gray-400 uppercase mb-6">
          Everything you need before you go
        </p>
        {/* Scrollable pill bar */}
        <div className="flex flex-wrap justify-center gap-3">
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all cursor-default"
            >
              <Icon className="w-4 h-4 text-gray-400" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
