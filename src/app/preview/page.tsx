import type { Metadata } from "next";
import ChecklistPreview from "@/components/sections/ChecklistPreview";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Checklist Preview | ChinaReady",
  description:
    "Preview the ChinaReady departure brief, checklist sections, and tutorial flow in a dedicated web page.",
  alternates: {
    canonical: `${SITE_URL}/preview`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PreviewPage() {
  return <ChecklistPreview />;
}
