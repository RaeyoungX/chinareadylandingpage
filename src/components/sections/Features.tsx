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
  BookOpen,
} from "lucide-react";

const features = [
  { icon: FileText, label: "Documents & Visa" },
  { icon: Globe, label: "VPN & Internet" },
  { icon: Map, label: "Navigation" },
  { icon: Train, label: "Transport" },
  { icon: Shield, label: "Safety" },
  { icon: Building, label: "Accommodation" },
  { icon: CreditCard, label: "Payments" },
  { icon: MessageSquare, label: "Community" },
  { icon: BookOpen, label: "Rules & Policy" },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-20 bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500 font-medium mb-6">
          Our Top Notch Features
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
