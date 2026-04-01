import type { Metadata } from "next";
import ChecklistPreview from "@/components/sections/ChecklistPreview";

export const metadata: Metadata = {
  title: "Checklist Preview | ChinaReady",
  description:
    "Preview the ChinaReady departure brief, checklist sections, and tutorial flow in a dedicated web page.",
};

export default function PreviewPage() {
  return <ChecklistPreview />;
}
