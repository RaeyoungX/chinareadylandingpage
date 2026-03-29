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
import Badge from "./Badge";

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Globe,
  Map,
  Train,
  Shield,
  Building,
  CreditCard,
  MessageSquare,
  BookOpen,
};

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  FileText: { bg: "bg-amber-50", icon: "text-amber-500", border: "group-hover:border-amber-200" },
  Globe: { bg: "bg-purple-50", icon: "text-purple-500", border: "group-hover:border-purple-200" },
  Map: { bg: "bg-emerald-50", icon: "text-emerald-500", border: "group-hover:border-emerald-200" },
  Train: { bg: "bg-red-50", icon: "text-red-500", border: "group-hover:border-red-200" },
  Shield: { bg: "bg-rose-50", icon: "text-rose-500", border: "group-hover:border-rose-200" },
  Building: { bg: "bg-teal-50", icon: "text-teal-500", border: "group-hover:border-teal-200" },
  CreditCard: { bg: "bg-blue-50", icon: "text-blue-500", border: "group-hover:border-blue-200" },
  MessageSquare: { bg: "bg-sky-50", icon: "text-sky-500", border: "group-hover:border-sky-200" },
  BookOpen: { bg: "bg-indigo-50", icon: "text-indigo-500", border: "group-hover:border-indigo-200" },
};

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  urgent?: boolean;
};

export default function FeatureCard({
  icon,
  title,
  description,
  urgent,
}: FeatureCardProps) {
  const Icon = iconMap[icon] || FileText;
  const color = colorMap[icon] || { bg: "bg-gray-50", icon: "text-gray-500", border: "group-hover:border-gray-200" };

  return (
    <div className={`group bg-white rounded-2xl p-6 border border-gray-100 ${color.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
      <div className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${color.icon}`} />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {urgent && <Badge>Urgent</Badge>}
      </div>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
