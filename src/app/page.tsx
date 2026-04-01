import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import ChecklistPreview from "@/components/sections/ChecklistPreview";
import Showcase from "@/components/sections/Showcase";
import HowItWorks from "@/components/sections/HowItWorks";
import DownloadCta from "@/components/sections/DownloadCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ChecklistPreview />
      <Showcase />
      <HowItWorks />
      <DownloadCta />
    </>
  );
}
